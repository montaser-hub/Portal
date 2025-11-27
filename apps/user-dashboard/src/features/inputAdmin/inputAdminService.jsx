import * as crudService from '../../services/crudService';

export const fetchDepartmentsAPI = async (filters = {}) => {
  return await crudService.getAll('/departments', filters);
};

export const fetchPositionsAPI = async (filters = {}) => {
  return await crudService.getAll('/positions', filters);
};

export const fetchLevelsAPI = async (filters = {}) => {
  return await crudService.getAll('/levels', filters);
};

