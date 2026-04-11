import API from './axiosInstance';

export const getAiAdviceApi = async (data) => {
    const response = await API.post('/ai/advice', data);
    return response.data;
};
