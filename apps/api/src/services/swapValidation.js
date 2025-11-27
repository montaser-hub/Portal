import AppError from "../utils/AppError.js";
import * as scheduleService from "./scheduleService.js";
import * as swapService from "./swapRequestService.js";
import { overlappingSchedulesValidation } from "./scheduleService.js";

export const validateSwapRequest = async (queryData, options={}) => {
  const { fromScheduleId, toScheduleId, fromUserId, toUserId } = queryData;
   const { mode = "create", currentSwapId = null } = options;
  // 1. Check schedules exist
  const fromSchedule = await scheduleService.getSchedule(fromScheduleId);

  const toSchedule = toScheduleId ? await scheduleService.getSchedule(toScheduleId) : null;

  // 2. Check users exist
  if (toUserId && fromUserId.toString() === toUserId.toString())
    throw new AppError("Cannot swap with yourself", 400);

  // Departments must match
  if (toSchedule &&
      toSchedule.departmentId.toString() !== fromSchedule.departmentId.toString()) {
    throw new AppError("Cannot swap between different departments", 400);
  }

  // 3. Check duplicate pending swap
  const {data: duplicate} = await swapService.getAllSwapRequests({
    fromScheduleId,
    toScheduleId,
    status: 'pending',
    isActive: true,
  });

    // CREATE mode
  if (mode === "create" && duplicate.length > 0)
    throw new AppError("Swap request already pending for these schedules", 409);

  // UPDATE mode - exclude current swap
  if (mode === "update") {
    const otherDuplicates = duplicate.filter(
      d => d._id.toString() !== currentSwapId.toString()
    );

    if (otherDuplicates.length > 0)
      throw new AppError("Another pending swap already exists for these schedules", 409);
  }

  // 4. Overlapping schedule validation for users
  await overlappingSchedulesValidation({
    date: fromSchedule?.date,
    shiftId: fromSchedule?.shiftId,
    subDepartmentId: fromSchedule?.subDepartmentId,
    userId: toUserId || fromUserId,
    departmentId: fromSchedule.departmentId,
    ignoreScheduleId: toScheduleId,
  });

  if (toSchedule) {
    await overlappingSchedulesValidation({
      date: toSchedule?.date,
      shiftId: toSchedule?.shiftId,
      subDepartmentId: toSchedule?.subDepartmentId,
      userId: fromUserId,
      departmentId: toSchedule?.departmentId,
      ignoreScheduleId: fromScheduleId,
    });
  }

  return { fromSchedule, toSchedule };
};
