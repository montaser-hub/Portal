import * as SwapRequestRepo from '../dataAccess/swapRequestRepo.js'
import AppError from '../utils/AppError.js'

//  Add SwapRequest
export const addSwapRequest = async (data) => {
  return await SwapRequestRepo.create(data)
}

// Get SwapRequest By Id
export const getSwapRequest = async (id) => {
  const SwapRequest = await SwapRequestRepo.findById(id)
  if (!SwapRequest) throw new AppError("SwapRequest not found.", 404)
  return SwapRequest
}

// Get All SwapRequests
export const getAllSwapRequests = async () => {
  return await SwapRequestRepo.findAll()
}

// Update SwapRequest
export const updateSwapRequest = async (id, data) => {
  const updatedSwapRequest = await SwapRequestRepo.update(id, data)
  if (!updatedSwapRequest) throw new AppError("SwapRequest already existed.", 400)
  return updatedSwapRequest
}

// Delete SwapRequest
export const deleteSwapRequest = async (id) => {
  const SwapRequest = await SwapRequestRepo.findById(id)
  if (!SwapRequest) throw new AppError("SwapRequest not found.", 404)
  return await SwapRequestRepo.removeById(id)
}

// Delete All SwapRequests
export const deleteAllSwapRequests = async () => {
  return await SwapRequestRepo.deleteAll()
}

