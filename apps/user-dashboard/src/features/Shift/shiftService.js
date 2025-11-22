import * as crudService from '../../services/crudService';

const endpoint = '/shifts';

export const fetchShifts = async (filters = {}) => {
  return await crudService.getAll(endpoint, filters);
};
