import * as SwapRequestRepo from '../dataAccess/swapRequestRepo.js'

//  Add SwapRequest
export const addSwapRequest = async (data) => {
  const { fromUserId, fromScheduleId, ...body } = data
  const existedSwapRequest = await SwapRequestRepo.findOne({ fromUserId, fromScheduleId })
 if (existedSwapRequest)  throw new Error("you create SwapRequest for this shift already .")
  const newSwapRequest = await SwapRequestRepo.create({ fromUserId, fromScheduleId, ...body })
  return newSwapRequest ;
}

// Get SwapRequest By Id
export const getSwapRequest = async (id) => {
  const SwapRequest = await SwapRequestRepo.findById(id)
  if (!SwapRequest) throw new Error("SwapRequest not found.")
  return SwapRequest
}

// Get All SwapRequests
export const getAllSwapRequests = async () => {
  return await SwapRequestRepo.findAll()
}

// Update SwapRequest
export const updateSwapRequest = async (id, data) => {
  const { fromUserId, fromScheduleId, ...body } = data
  const updatedSwapRequest = await SwapRequestRepo.update(id, {fromUserId, fromScheduleId, ...body })
  if (!updatedSwapRequest) throw new Error("SwapRequest already existed.")
  return updatedSwapRequest
}

// Delete SwapRequest
export const deleteSwapRequest = async (id) => {
  const SwapRequest = await SwapRequestRepo.findById(id)
  if (!SwapRequest) throw new Error("SwapRequest not found.")
  return await SwapRequestRepo.removeById(id)
}

// Delete All SwapRequests
export const deleteAllSwapRequests = async () => {
  return await SwapRequestRepo.deleteAll()
}

