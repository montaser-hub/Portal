import * as scheduleRepo from '../dataAccess/scheduleRepo.js'
import AppError from '../utils/AppError.js'
import { getAllDocuments } from './queryService.js'
import { toZonedTime } from 'date-fns-tz';
import { addSeconds } from 'date-fns';

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
    subDepartmentId,
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

export const nextSchedule = async ( userId, nowInTZ, timezone) => {
  const schedules = await scheduleRepo.nextSchedule( userId )
  // Filter nearest after now
    const upcomingSchedule = schedules.find((s) => {
      const scheduleDateTime = getScheduleDateTime(s, timezone);
      return scheduleDateTime >= nowInTZ;
    } );

  return upcomingSchedule
}

function getScheduleDateTime(schedule, timezone = 'Africa/Cairo') {
  // Combine schedule.date + shift.startTime (seconds) → exact datetime in user TZ
  const date = new Date(schedule.date); // stored as UTC
  const dateInTZ = toZonedTime(date, timezone);
  return addSeconds(dateInTZ, schedule.shift.startTime || 0);
}
