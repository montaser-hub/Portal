import * as crudService from '../../services/crudService';

const endpoint = '/swapRequests';

export const fetchSwapRequests = async (filters = {}) => {
  const swaprequests = await crudService.getAll(endpoint, filters);

  return swaprequests;
};

export const addSwapRequest = async (data) => crudService.create(endpoint, data);

export const editSwapRequest = async (id, data) => crudService.update(endpoint, id, data);

export const removeSwapRequest = async (id) => crudService.remove( endpoint, id );

export const fetchSwapRequest = async (id) => crudService.getById( endpoint, id );

export const swapIsAproved = async (id, data) => crudService.update(endpoint, id, data);
