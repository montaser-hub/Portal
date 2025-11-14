import api from './api';

export const getAll = async (endpoint, params = {}) => api.get(endpoint, { params });

export const getById = async (endpoint, id) => api.get(`${endpoint}/${id}`);

export const create = async (endpoint, data) => api.post(endpoint, data);

export const update = async (endpoint, id, data) => api.put(`${endpoint}/${id}`, data);

export const edit = async (endpoint, id, data) => api.patch(`${endpoint}/${id}`, data);

export const remove = async (endpoint, id) => api.delete(`${endpoint}/${id}`);
