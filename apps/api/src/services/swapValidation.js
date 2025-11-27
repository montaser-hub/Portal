import AppError from "../utils/AppError.js";
import * as scheduleService from "./scheduleService.js";
import * as swapService from "./swapRequestService.js";
import { overlappingSchedulesValidation } from "./scheduleService.js";

export const validateSwapRequest = async (data) => {
  const { fromScheduleId, toScheduleId, fromUserId, toUserId } = data;

  // 1. Check schedules exist
  const fromSchedule = await scheduleService.getSchedule(fromScheduleId);

  const toSchedule = toScheduleId ? await scheduleService.getSchedule(toScheduleId) : null;

  // 2. Check users exist
  if (toUserId && fromUserId.toString() === toUserId.toString())
    throw new AppError("Cannot swap with yourself", 400);

  // 3. Check duplicate pending swap
  const duplicate = await swapService.getAllSwapRequests({
    fromScheduleId,
    toScheduleId,
    status: 'pending',
    isActive: true,
    isAll: true
  });
  if (duplicate) throw new AppError("Swap request already pending for these schedules", 409);

  // 4. Overlapping schedule validation for users
  await overlappingSchedulesValidation({
    date: fromSchedule?.date,
    shiftId: fromSchedule?.shiftId,
    subDepartmentId: fromSchedule?.subDepartmentId,
    userId: toUserId || fromUserId,
    departmentId: fromSchedule.departmentId
  });

  if (toSchedule) {
    await overlappingSchedulesValidation({
      date: toSchedule?.date,
      shiftId: toSchedule?.shiftId,
      subDepartmentId: toSchedule?.subDepartmentId,
      userId: fromUserId,
      departmentId: toSchedule?.departmentId
    });
  }

  return { fromSchedule, toSchedule };
};
