import * as crudService from '../../services/crudService';

const endpoint = '/schedules';

export const fetchSchedules = async (filters = {}) => {
  // filters can include search, status, date ranges, etc.
  const schedules = await crudService.getAll(endpoint, filters);

  return schedules
};

export const addSchedule = async (data) => crudService.create(endpoint, data);

export const editSchedule = async (id, data) => crudService.update(endpoint, id, data);

export const removeSchedule = async (id) => crudService.remove( endpoint, id );

export const fetchSchedule = async (id) => crudService.getById(endpoint, id);
