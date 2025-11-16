import * as crudService from '../../services/crudService';

const endpoint = '/swapRequests';

export const fetchSwapRequests = async (filters = {}) => {
  const schedules = await crudService.getAll(endpoint, filters);

  return schedules
};

export const addSwapRequest = async (data) => crudService.create(endpoint, data);

export const editSwapRequest = async (id, data) => crudService.update(endpoint, id, data);

export const removeSwapRequest = async (id) => crudService.remove( endpoint, id );

export const fetchSwapRequest = async (id) => crudService.getById(endpoint, id);
