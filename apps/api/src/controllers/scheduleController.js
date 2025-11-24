import * as scheduleService from '../services/scheduleService.js'
import catchAsync from "../utils/catchAsync";
import { toZonedTime } from 'date-fns-tz';

export const addSchedule = catchAsync( async ( req, res, next ) => {
  const data = { ...req.body }
  const user = req?.user
  const scheduleData = await scheduleService.createSchedule(data, user)
  return res.status(200).json({ message: "Schedule added successfully", data: scheduleData });
} )

export const updateSchedule = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const data = { ...req.body }

  const updatedSchedule = await scheduleService.updateSchedule(id, data)
  res.status(200).json({ message: "Schedule updated successfully", data: updatedSchedule });
})

export const getAllSchedules = catchAsync( async ( req, res, next ) => {
  const query = {...req.query}
  const {data, total, totalFiltered} = await scheduleService.getAllSchedules(query)
  res.status(200).json({
    message: "Schedules fetched successfully",
    totalFiltered,
    total,
    limit: query.limit,
    page: query.page,
    data
  });
})

export const getSchedule = catchAsync( async ( req, res, next ) => {
  const id = req.params.id

  const schedule = await scheduleService.getSchedule( id )

  res.status(200).json({ message: "Schedule fetched successfully", data: schedule });
} )

export const deleteSchedule = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const schedule = await scheduleService.deleteSchedule(id)
  res.status(200).json({ message: "Schedule deleted successfully", data: schedule });
})

export const getNearestSchedule = catchAsync( async ( req, res, next ) => {
  const userId = req?.user?._id
  const timezone = req.query.timezone || 'Africa/Cairo';

    // Get current time in user's timezone
    const now = new Date();
    const nowInTZ = toZonedTime(now, timezone);
  const schedule = await scheduleService.nextSchedule(userId, nowInTZ, timezone)
  res.status(200).json({ message: "Next Schedule fetched successfully", data: schedule });
} )
