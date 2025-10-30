import * as SwapRequestRepo from '../dataAccess/swapRequestRepo.js'

//  Add SwapRequest
export const addSwapRequest = async (data) => {
  return await SwapRequestRepo.create(data)
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
  const updatedSwapRequest = await SwapRequestRepo.update(id, data)
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

