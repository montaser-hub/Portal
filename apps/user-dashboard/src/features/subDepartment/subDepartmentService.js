import * as crudService from '../../services/crudService';

const endpoint = '/subdepartments';

export const fetchSubDepartments = async (filters = {}) => {
  return await crudService.getAll(endpoint, filters);
}
