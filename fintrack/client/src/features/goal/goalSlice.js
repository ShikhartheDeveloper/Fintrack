import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateBudgetApi } from '../../api/authApi';

const userStr = localStorage.getItem('user');
const user = userStr ? JSON.parse(userStr) : null;
const initialGoal = user && user.monthlyBudget ? Number(user.monthlyBudget) : (localStorage.getItem('budgetGoal') ? Number(localStorage.getItem('budgetGoal')) : 0);

const initialState = {
    budgetGoal: initialGoal,
    currentSpend: 0,
    progressPercent: 0,
    loading: false,
    error: null
};

// Async thunk to update budget
export const updateBudgetGoal = createAsyncThunk(
    'goal/updateBudgetGoal',
    async (budget, thunkAPI) => {
        try {
            const data = await updateBudgetApi(budget);
            return data.monthlyBudget;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to update budget goal');
        }
    }
);

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        setGoal: (state, action) => {
            state.budgetGoal = action.payload;
            
            // Also update the local storage user object so it persists
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                user.monthlyBudget = action.payload;
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.setItem('budgetGoal', action.payload);
            }
            
            if (state.budgetGoal > 0) {
                state.progressPercent = Math.min((state.currentSpend / state.budgetGoal) * 100, 100);
            } else {
                state.progressPercent = 0;
            }
        },
        updateSpend: (state, action) => {
            state.currentSpend = action.payload;
            if (state.budgetGoal > 0) {
                state.progressPercent = Math.min((state.currentSpend / state.budgetGoal) * 100, 100);
            } else {
                state.progressPercent = 0;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateBudgetGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBudgetGoal.fulfilled, (state, action) => {
                state.loading = false;
                state.budgetGoal = action.payload;
                
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    user.monthlyBudget = action.payload;
                    localStorage.setItem('user', JSON.stringify(user));
                }
                
                if (state.budgetGoal > 0) {
                    state.progressPercent = Math.min((state.currentSpend / state.budgetGoal) * 100, 100);
                } else {
                    state.progressPercent = 0;
                }
            })
            .addCase(updateBudgetGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Listen to auth actions
            .addCase('auth/logoutUser', (state) => {
                state.budgetGoal = 0;
                state.currentSpend = 0;
                state.progressPercent = 0;
                localStorage.removeItem('budgetGoal');
            })
            .addCase('auth/loginUser/fulfilled', (state, action) => {
                const fetchedBudget = action.payload.monthlyBudget ? Number(action.payload.monthlyBudget) : 0;
                state.budgetGoal = fetchedBudget;
                if (state.budgetGoal > 0) {
                    state.progressPercent = Math.min((state.currentSpend / state.budgetGoal) * 100, 100);
                } else {
                    state.progressPercent = 0;
                }
            })
            .addCase('auth/registerUser/fulfilled', (state, action) => {
                const fetchedBudget = action.payload.monthlyBudget ? Number(action.payload.monthlyBudget) : 0;
                state.budgetGoal = fetchedBudget;
                if (state.budgetGoal > 0) {
                    state.progressPercent = Math.min((state.currentSpend / state.budgetGoal) * 100, 100);
                } else {
                    state.progressPercent = 0;
                }
            });
    }
});

export const { setGoal, updateSpend } = goalSlice.actions;
export default goalSlice.reducer;
