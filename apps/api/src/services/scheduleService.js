// scheduleService.js
import * as scheduleRepo from '../dataAccess/scheduleRepo.js';
import * as subDepartmentService from './SubdepartmentService.js';
import * as shiftService from './shiftService.js';
import * as departmentService from './departmentService.js';
import AppError from '../utils/AppError.js';
import { getAllDocuments } from './queryService.js';
import { addMinutes, areIntervalsOverlapping } from 'date-fns';

/**
 * Validation function to check duplicate schedules and overlapping shifts
 */
const overlappingSchedulesValidation = async (data) => {
  const { date, shiftId, subDepartmentId, userId, departmentId } = data;
  // ===== Validation 0: Check department & subDepartment exist via service =====
  if (departmentId) {
    const department = await departmentService.getDepartment(departmentId);
  }

  if (subDepartmentId) {
    const subDepartment = await subDepartmentService.getSubDepartmentById(subDepartmentId);
  
    if (departmentId && subDepartment.departmentId.toString() !== departmentId.toString()) {
      throw new AppError("SubDepartment does not belong to the specified Department", 400);
    }
  }

  const newShift = shiftId ? await shiftService.getShift(shiftId) : null;
  if (shiftId && !newShift) throw new AppError("Shift not found", 404);

  // ===== Validation 1: Duplicate schedule =====
  const existingSchedule = await scheduleRepo.findOne({
    date: new Date(date),
    shiftId,
    subDepartmentId,
    userId,
    isActive: true
  });
  if (existingSchedule) throw new AppError("Schedule already exists for this date, shift, and subdepartment", 409);

  // ===== Validation 2: Overlapping shifts =====
  if (userId && newShift) {
    const shiftDate = new Date(date);
    const newShiftStart = addMinutes(new Date(shiftDate), newShift.startTime);
    const newShiftEnd = addMinutes(new Date(shiftDate), newShift.endTime);

    const existingSchedules = await scheduleRepo.findMany({
      date: new Date(date),
      userId,
      isActive: true
    });

    await Promise.all(existingSchedules.map(sch => sch.populate('shift')));

    for (const schedule of existingSchedules) {
      const existingShift = schedule?.shift;
      if (!existingShift) continue;

      const existingStart = addMinutes(new Date(shiftDate), existingShift.startTime);
      const existingEnd = addMinutes(new Date(shiftDate), existingShift.endTime);

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
};

/**
 * Create a new schedule
 */
export const createSchedule = async (data, user) => {
  if (!data.userId && user?._id) data.userId = user._id;
  if (!data.departmentId && user?.departmentId) data.departmentId = user.departmentId;

  await overlappingSchedulesValidation(data);

  return await scheduleRepo.create(data);
};

/**
 * Update an existing schedule
 */
export const updateSchedule = async (id, data, user) => {
    if (!data.userId && user?._id) data.userId = user._id;
  if (!data.departmentId && user?.departmentId) data.departmentId = user.departmentId;
  await overlappingSchedulesValidation(data);

  const updatedSchedule = await scheduleRepo.update(id, data);
  if (!updatedSchedule) throw new AppError("Schedule Not Found", 404);
  return updatedSchedule;
};

/**
 * Get all schedules with optional query params
 */
export const getAllSchedules = async (queryParams) => {
  const searchableFields = [
    'userId',
    'date',
    'shiftId',
    'subDepartmentId',
    'departmentId',
    'swapRequestId',
    'isActive'
  ];
  return await getAllDocuments(scheduleRepo, queryParams, searchableFields);
};

/**
 * Get a single schedule by id
 */
export const getSchedule = async (id) => {
  const schedule = await scheduleRepo.findById(id);
  if (!schedule) throw new AppError("Schedule Not Found", 404);
  return schedule;
};

/**
 * Soft delete a schedule
 */
export const deleteSchedule = async (id) => {
  const data = { isActive: false };
  const schedule = await scheduleRepo.update(id, data);
  if (!schedule) throw new AppError("Schedule Not Found", 404);
  return schedule;
};
