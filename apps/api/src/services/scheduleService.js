import * as scheduleRepo from '../dataAccess/scheduleRepo.js'
import AppError from '../utils/AppError.js'
import { getAllDocuments } from './queryService.js'


export const createSchedule = async (data, user) => {
  
  if(user?.role.includes('user')) {
    data.userId = user?._id
    data.departmentId = user?.departmentId
  }
  
  const { date, shiftId, subDepartmentId, userId, departmentId } = data;

  // 1. التحقق من عدم تكرار نفس الـ schedule
  const existingSchedule = await scheduleRepo.findDuplicate({
    date,
    shiftId,
    subDepartmentId
    departmentId,
    userId,
    isActive: true
  });

  if (existingSchedule) {
    throw new AppError("Schedule already exists for this date, shift, and subdepartment", 409);
  }

  // 2. التحقق من عدم وجود تعارض في الشفتات
  if (userId) {
    const hasConflict = await scheduleRepo.checkShiftConflict({
      date,
      userId,
      shiftId,
      isActive: true
    });

    if (hasConflict) {
      throw new AppError("Shift time conflict detected. User already has a schedule at this time", 409);
    }
  }

  // بعد التحقق من كل حاجة، نضيف الـ schedule
  return await scheduleRepo.create(data);
}

export const updateSchedule = async (id, data) => {
  const updatedschedule = await scheduleRepo.update( id, data )
  if ( !updatedschedule ) throw new AppError( "Shift Not Found", 404 )
  return updatedschedule
}

export const getAllSchedules = async (queryParams) => {
  const searchableFields = ['userId', 'date', 'shiftId', 'subDepartmentId', 'departmentId', 'swapRequestId', 'isActive'];
  return  await getAllDocuments(scheduleRepo, queryParams, searchableFields);
}

export const getSchedule = async ( id ) => {
  const schedule = await scheduleRepo.findById( id )
  if ( !schedule ) throw new AppError( "Shift Not Found", 404 )
  return schedule
}

export const deleteSchedule = async ( id ) => {
  data = { isActive: false }
  const schedule = await scheduleRepo.update( id, data )
  if ( !schedule ) throw new AppError( "Shift Not Found", 404 )
  return schedule
}
