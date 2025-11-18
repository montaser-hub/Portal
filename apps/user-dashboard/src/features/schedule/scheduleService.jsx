import * as crudService from '../../services/crudService';

const endpoint = '/schedules';

export const fetchSchedules = async (filters = {}) => {
  console.log('🔄 fetchSchedules service - filters:', filters);
  const schedules = await crudService.getAll(endpoint, filters);
  console.log('✅ fetchSchedules service - result:', schedules);
  return schedules;
};

export const addSchedule = async (data) => {
  console.log('🔄 addSchedule service - data:', data);
  
  const apiData = {
    date: data.date,
    shiftId: data.shiftId,
    subDepartmentId: data.subDepartmentId
  };
  
  console.log('📤 addSchedule service - sending to API:', apiData);
  
  try {
    const result = await crudService.create(endpoint, apiData);
    console.log('✅ addSchedule service - success:', result);
    return result;
  } catch (error) {
    console.error('❌ addSchedule service - error:', error);
    throw error;
  }
};

export const editSchedule = async (id, data) => {
  console.log('🔄 editSchedule service - id:', id, 'data:', data);
  
  const apiData = {
    date: data.date,
    shiftId: data.shiftId,
    subDepartmentId: data.subDepartmentId
  };
  
  console.log('📤 editSchedule service - sending PATCH to API:', apiData);
  
  try {
    const result = await crudService.updatePartial(endpoint, id, apiData);
    console.log('✅ editSchedule service - success:', result);
    return result;
  } catch (error) {
    console.error('❌ editSchedule service - error:', error);
    throw error;
  }
};

export const removeSchedule = async (id) => {
  console.log('🔄 removeSchedule service - id:', id);
  
  try {
    const result = await crudService.remove(endpoint, id);
    console.log('✅ removeSchedule service - success:', result);
    return result;
  } catch (error) {
    console.error('❌ removeSchedule service - error:', error);
    throw error;
  }
};

export const fetchSchedule = async (id) => {
  console.log('🔄 fetchSchedule service - id:', id);
  
  try {
    const result = await crudService.getById(endpoint, id);
    console.log('✅ fetchSchedule service - success:', result);
    return result;
  } catch (error) {
    console.error('❌ fetchSchedule service - error:', error);
    throw error;
  }
};