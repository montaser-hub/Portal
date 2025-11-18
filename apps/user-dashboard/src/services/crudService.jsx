import api from './api';

const handleRequest = async (request) => {
  try {
    const res = await request;
    return res.data;
  } catch (err) {
    console.error('API Error:', err);
    if (!err.response) {
      throw { message: 'Network error. Please try again.' };
    }
    
    // تحسين الـerror message
    const errorMessage = err.response?.data?.message || 
                        err.response?.data?.error || 
                        err.message || 
                        'API request failed';
    
    throw new Error(errorMessage);
  }
};

export const getAll = (endpoint, params = {}) => handleRequest(api.get(endpoint, { params }));

export const getById = (endpoint, id) => handleRequest(api.get(`${endpoint}/${id}`));

export const create = (endpoint, data) => handleRequest(api.post(endpoint, data));

export const update = (endpoint, id, data) => handleRequest(api.put(`${endpoint}/${id}`, data));

export const updatePartial = (endpoint, id, data) => handleRequest(api.patch(`${endpoint}/${id}`, data));

export const remove = (endpoint, id) => handleRequest(api.delete(`${endpoint}/${id}`));