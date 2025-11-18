import * as crudService from '../../services/crudService';

const endpoint = '/shifts';

// جلب كل الشفتات
export const fetchShifts = async () => {
  try {
    const result = await crudService.getAll(endpoint);
    console.log('✅ fetchShifts service - result:', result);
    return result;
  } catch (error) {
    console.error('❌ fetchShifts service - error:', error);
    throw error;
  }
};