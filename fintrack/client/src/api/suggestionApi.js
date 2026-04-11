import API from './axiosInstance';

export const saveSuggestionApi = async (suggestionData) => {
    const response = await API.post('/suggestions', suggestionData);
    return response.data;
};

export const getSuggestionsApi = async () => {
    const response = await API.get('/suggestions');
    return response.data;
};

export const deleteSuggestionApi = async (id) => {
    const response = await API.delete(`/suggestions/${id}`);
    return response.data;
};
