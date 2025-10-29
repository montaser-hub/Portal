import * as shiftService from '../services/shiftService.js'
import catchAsync from "../utils/catchAsync";


export const addShift = catchAsync( async ( req, res, next ) => {
  const data = { ...req.body }
  const shiftData = await shiftService.createShift(data)
  return res.status(200).json({ message: "Shift added successfully", data: shiftData });
})

export const getAllShifts = catchAsync( async ( req, res, next ) => {
  const shifts = await shiftService.getAllShifts()
  res.status(200).json({ message: "Shifts fetched successfully", data: shifts });
})

export const getShift = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  
  const shift = await shiftService.getShift(id)

  res.status(200).json({ message: "Shift fetched successfully", data: shift });
})

export const updateShift = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const data = { ...req.body }
  
  const updatedShift = await shiftService.updateShift(id, data)
  res.status(200).json({ message: "Shift updated successfully", data: updatedShift });
})

export const deleteShift = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  
  await shiftService.deleteShift(id)
  res.status(200).json({ message: "Shift deleted successfully" });
})
