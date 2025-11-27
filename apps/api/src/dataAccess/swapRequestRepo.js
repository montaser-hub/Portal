import SwapRequest from '../models/swapRequestModel.js'

// Create SwapRequest
export const create = async (data) => {
  return (await SwapRequest.create(data)).populate('fromUser', 'firstName lastName role fullName')
}

// Find SwapRequest
export const findOne = async (query) => {
  return await SwapRequest.findOne( query )
  .populate('department')
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
  .populate('department')
  .populate( {
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

// Get All SwapRequests
export const findAll = () => {
  return SwapRequest.find()
  .populate('department')
  .populate({
    path: 'fromSchedule',
    populate: scheduleNestedPopulate
  })
  .populate( {
    path: 'toSchedule',
    populate: scheduleNestedPopulate
  })
  .populate('fromUser', 'firstName lastName role')
  .populate('toUser', 'firstName lastName role ')
}

// Update SwapRequest
export const update = async (id, data) => {
  return await SwapRequest.findByIdAndUpdate(id, data, { new: true }).populate('fromUser', 'firstName lastName role fullName')
}
// Delete SwapRequest
export const removeById = async (id) => {
  return await SwapRequest.findByIdAndDelete(id)
}

export const countAll = () => SwapRequest.countDocuments();

export const countFiltered = (filter) => SwapRequest.countDocuments(filter);

const scheduleNestedPopulate = [
  { path: 'shift' },
  { path: 'subDepartment'}
];
