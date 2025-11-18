import SwapRequest from '../models/swapRequestModel.js'

// Create SwapRequest
export const create = async (data) => {
  return await SwapRequest.create(data)
}

// Find SwapRequest
export const findOne = async (query) => {
  return await SwapRequest.findOne(query)
  .populate({
    path: 'fromSchedule',
    populate: scheduleNestedPopulate
  })
  .populate( {
    path: 'toSchedule',
    populate: scheduleNestedPopulate
  })
  .populate('fromUser', 'firstName lastName role')
  .populate('toUser', 'firstName lastName role')
}

// Get SwapRequest By Id
export const findById = async (id) => {
  return await SwapRequest.findById(id)
}

// Get All SwapRequests
export const findAll = () => {
  return SwapRequest.find()
  .populate({
    path: 'fromSchedule',
    populate: scheduleNestedPopulate
  })
  .populate( {
    path: 'toSchedule',
    populate: scheduleNestedPopulate
  })
  .populate('fromUser', 'firstName lastName role')
  .populate('toUser', 'firstName lastName role')
}

// Update SwapRequest
export const update = async (id, data) => {
  return await SwapRequest.findByIdAndUpdate(id, data, { new: true })
}

// Delete SwapRequest
export const removeById = async (id) => {
  return await SwapRequest.findByIdAndDelete(id)
}

export const countAll = () => SwapRequest.countDocuments();

export const countFiltered = (filter) => SwapRequest.countDocuments(filter);

const scheduleNestedPopulate = [
  { path: 'shiftId', model: 'Shift' },
  { path: 'subDepartmentId', model: 'SubDepartment' }
];
