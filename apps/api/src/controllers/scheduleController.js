import * as scheduleService from '../services/scheduleService.js'
import catchAsync from "../utils/catchAsync";

export const addSchedule = catchAsync( async ( req, res, next ) => {
  const data = { ...req.body }
  const user = req?.user
  const scheduleData = await scheduleService.createSchedule(data, user)
  return res.status(200).json({ message: "Schedule added successfully", data: scheduleData });
} )

export const updateSchedule = catchAsync (async ( req, res, next ) => {
  const id = req.params.id
  const data = { ...req.body }
  const user = req?.user
  const updatedSchedule = await scheduleService.updateSchedule(id, data,user)
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