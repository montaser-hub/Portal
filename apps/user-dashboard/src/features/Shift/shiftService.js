import * as crudService from '../../services/crudService';

const endpoint = '/shifts';

// جلب كل الشفتات
export const fetchShifts = async () => {
  try {
    const result = await crudService.getAll(endpoint);
    return result;
  } catch (error) {
    throw error;
  }
};
