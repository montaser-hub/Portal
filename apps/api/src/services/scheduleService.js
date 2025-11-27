import * as scheduleRepo from '../dataAccess/scheduleRepo.js';
import * as subDepartmentService from './SubdepartmentService.js';
import * as shiftService from './shiftService.js';
import * as departmentService from './departmentService.js';
import AppError from '../utils/AppError.js';
import { getAllDocuments } from './queryService.js';
import { addMinutes, areIntervalsOverlapping, addSeconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

/**
 * Validation function to check duplicate schedules and overlapping shifts
 */
export const overlappingSchedulesValidation = async (data) => {
  const { date, shiftId, subDepartmentId, userId, departmentId, ignoreScheduleId = null } = data;
  // ===== Validation 0: Check department & subDepartment exist via service =====
  if (departmentId) {
    await departmentService.getDepartment(departmentId);
  }

  if (subDepartmentId) {
    const subDepartment = await subDepartmentService.getSubDepartmentById(subDepartmentId);

    if (departmentId && subDepartment.departmentId.toString() !== departmentId.toString()) {
      throw new AppError("SubDepartment does not belong to the specified Department", 400);
    }
  }

  const newShift = shiftId ? await shiftService.getShift(shiftId) : null;

  const scheduleDate = new Date(date);

  // ===== Validation 1: Duplicate schedule =====
  const duplicateQuery = {
    date: scheduleDate,
    shiftId,
    subDepartmentId,
    userId,
    isActive: true
  };
  if (ignoreScheduleId) duplicateQuery._id = { $ne: ignoreScheduleId };

    const existingSchedule = await scheduleRepo.findOne(duplicateQuery);
    if (existingSchedule) throw new AppError("Schedule already exists for this date, shift, and subdepartment", 409);
  // ===== Validation 2: Overlapping shifts =====
    if (!userId || !newShift) return;

    const newShiftStart = addMinutes( new Date( scheduleDate ), newShift?.startTime );
    const newShiftEnd = addMinutes(new Date(scheduleDate), newShift?.endTime);

    const existingSchedules = await scheduleRepo.findMany({
      date: scheduleDate,
      userId,
      isActive: true,
      ...(ignoreScheduleId && { _id: { $ne: ignoreScheduleId } })
    });

    for (const schedule of existingSchedules) {
      const existingShift = schedule?.shift;
      if (!existingShift) continue;

      const existingStart = addMinutes(new Date(scheduleDate), existingShift.startTime);
      const existingEnd = addMinutes(new Date(scheduleDate), existingShift.endTime);

      const overlap = areIntervalsOverlapping(
        { start: newShiftStart, end: newShiftEnd },
        { start: existingStart, end: existingEnd }
      );

      if (overlap) {
        throw new AppError(
          `Shift time conflict detected. User already has a schedule (${existingShift.shiftType}-${existingShift.shiftName}) at this time`,
          409
        );
      }
    }
}

/**
 * Create a new schedule
 */
export const createSchedule = async (data, user) => {
  if (!data.userId && user?._id) data.userId = user?._id;
  if (!data.departmentId && user?.departmentId) data.departmentId = user?.departmentId;

  await overlappingSchedulesValidation(data);

  return await scheduleRepo.create(data);
};

/**
 * Update an existing schedule
 */
export const updateSchedule = async (id, data, user) => {
    if (!data.userId && user?._id) data.userId = user._id;
  if (!data.departmentId && user?.departmentId) data.departmentId = user.departmentId;
  await overlappingSchedulesValidation( {
    ...data,
    ignoreScheduleId: id
  });

  const updatedSchedule = await scheduleRepo.update(id, data);
  if (!updatedSchedule) throw new AppError("Schedule Not Found", 404);
  return updatedSchedule;
};

/**
 * Get all schedules with optional query params
 */
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

export const swapSchedule = async (id, userId) => {
  const updatedSchedule = await scheduleRepo.update(id, userId);
  if (!updatedSchedule) throw new AppError("Schedule Not Found", 404);
  return updatedSchedule;
}


export const createMultiUserSchedule = async ( data ) => {
  const { dates, userIds, ...commonFields } = data;

  // Convert ISO strings → real Date objects
  const dateObjects = dates.map(d => new Date(d));

  // Build array of documents (one per user × date)
  const documentsToInsert = dateObjects.flatMap(date =>
    userIds.map(userId => ({
      ...commonFields,
      userId,
      date,
    }))
  );
  return await scheduleRepo.createMultiUserSchedule(documentsToInsert);
}
