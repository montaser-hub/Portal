import * as crudService from '../../services/crudService';

const endpoint = '/schedules';

export const fetchSchedules = async (filters = {}) => {
  const schedules = await crudService.getAll(endpoint, filters);
  return schedules;
};

export const addSchedule = async (data) => {
  const apiData = {
    date: data.date,
    shiftId: data.shiftId,
    subDepartmentId: data.subDepartmentId
  };
  try {
    const result = await crudService.create(endpoint, apiData);
    return result;
  } catch (error) {
    throw error;
  }
};

export const editSchedule = async (id, data) => {
  const apiData = {
    date: data.date,
    shiftId: data.shiftId,
    subDepartmentId: data.subDepartmentId
  };
  try {
    const result = await crudService.updatePartial(endpoint, id, apiData);
    return result;
  } catch (error) {
    throw error;
  }
};

export const removeSchedule = async (id) => {
  try {
    const result = await crudService.remove(endpoint, id);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchSchedule = async (id) => {
  try {
    const result = await crudService.getById(endpoint, id);
    return result;
  } catch (error) {
    throw error;
  }
};
