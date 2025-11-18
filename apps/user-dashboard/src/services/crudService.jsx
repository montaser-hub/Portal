import toast from 'react-hot-toast';
import api from './api';

const handleRequest = async (request) => {
  try {
    const res = await request;
    return res.data;
  } catch (err) {
    console.error( 'API Error:', err );
    if ( !err.response ) {
      toast.error('Network error. Please try again.');
      throw err;
    }
    const message =
      err.response?.data?.message || err.message || err.response?.data?.error || 'Request failed';
    toast.error(message);

    // Re-throw so .unwrap() rejects
    throw new Error(message);
  }
};

export const getAll = (endpoint, params = {}) => handleRequest(api.get(endpoint, { params }));

export const getById = (endpoint, id) => handleRequest(api.get(`${endpoint}/${id}`));

export const create = (endpoint, data) => handleRequest(api.post(endpoint, data));

export const update = (endpoint, id, data) => handleRequest(api.put(`${endpoint}/${id}`, data));

export const updatePartial = (endpoint, id, data) => handleRequest(api.patch(`${endpoint}/${id}`, data));

export const remove = (endpoint, id) => handleRequest(api.delete(`${endpoint}/${id}`));