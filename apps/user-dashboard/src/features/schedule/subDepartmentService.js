import * as crudService from '../../services/crudService';

const endpoint = '/subdepartments';

// جلب كل الـsubDepartments الخاصة بالـdepartment بتاع اليوزر
export const fetchSubDepartments = async (departmentId) => {
  try {
    const params = departmentId ? { departmentId } : {};
    const result = await crudService.getAll(endpoint, params);
    console.log('✅ fetchSubDepartments service - result:', result);
    return result;
  } catch (error) {
    console.error('❌ fetchSubDepartments service - error:', error);
    throw error;
  }
};