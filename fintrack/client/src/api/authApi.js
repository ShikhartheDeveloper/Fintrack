import API from './axiosInstance';

export const registerUserApi = async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
};

export const loginUserApi = async (userData) => {
    const response = await API.post('/auth/login', userData);
    return response.data;
};

export const updateBudgetApi = async (budget) => {
    const response = await API.put('/auth/budget', { budget });
    return response.data;
};
