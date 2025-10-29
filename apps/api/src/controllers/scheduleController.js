import * as scheduleService from '../services/scheduleService.js'
import catchAsync from "../utils/catchAsync";

export const addSchedule = catchAsync( async ( req, res, next ) => {
  const data = { ...req.body }
  const scheduleData = await scheduleService.createSchedule(data)
  return res.status(200).json({ message: "Schedule added successfully", data: scheduleData });
} )

export const updateSchedule = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const data = { ...req.body }
  
  const updatedSchedule = await scheduleService.updateSchedule(id, data)
  res.status(200).json({ message: "Schedule updated successfully", data: updatedSchedule });
})

export const getAllSchedules = catchAsync( async ( req, res, next ) => {
  const schedules = await scheduleService.getAllSchedules()
  res.status(200).json({ message: "Schedules fetched successfully", data: schedules });
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