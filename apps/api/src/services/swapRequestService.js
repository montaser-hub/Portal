import * as SwapRequestRepo from '../dataAccess/swapRequestRepo.js'
import AppError from '../utils/AppError.js'
import { getAllDocuments } from './queryService.js'
import { sendNotification } from '../controllers/notificationController.js'
import { swapSchedule } from './scheduleService.js'
import { validateSwapRequest } from './swapValidation.js'
//  Add SwapRequest
export const addSwapRequest = async ( data ) => {
  await validateSwapRequest(data)
  const createdSwapRequest = await SwapRequestRepo.create( data )
    sendNotification(createdSwapRequest?.toUserId, {
    title: " Swap Request",
    message: `Swap request was sent form ${createdSwapRequest.fromUser.fullName} check your swap requet panel.`,
    type: `Swap Request`,
    priority: "Medium"
  })
  return createdSwapRequest;
}

// Get SwapRequest By Id
export const getSwapRequest = async (id) => {
  const SwapRequest = await SwapRequestRepo.findById(id)
  if (!SwapRequest) throw new AppError("SwapRequest not found.", 404)
  return SwapRequest
}

// Get All SwapRequests
export const getAllSwapRequests = async (queryParams) => {
  const searchableFields = [ 'status' ];
  return await getAllDocuments( SwapRequestRepo, queryParams, searchableFields);
}

// Update SwapRequest
export const updateSwapRequest = async (id, data) => {
  await validateSwapRequest(data)
  const updatedSwapRequest = await SwapRequestRepo.update(id, data)
  if (!updatedSwapRequest) throw new AppError("SwapRequest already existed.", 400)
    sendNotification(updatedSwapRequest?.toUserId, {
    title: " Swap Request",
    message: `Swap request was sent form ${updatedSwapRequest.fromUser.fullName} check your swap requet panel.`,
    type: "Swap Updated",
    priority: "Low"
  })
  return updatedSwapRequest
}

// Delete SwapRequest
export const deleteSwapRequest = async (id) => {
  const SwapRequest = await SwapRequestRepo.findById(id)
  if (!SwapRequest) throw new AppError("SwapRequest not found.", 404)
  return await SwapRequestRepo.removeById(id)
}

export const IsApproved = async (id, data) => {
  const isExists = await getSwapRequest(id)
  if(isExists?.status === "approved") throw new AppError("SwapRequest already approved.", 400)
  const updatedSwapRequest = await SwapRequestRepo.update(id, data)

  if ( updatedSwapRequest?.status == 'approved' ) {
    swapSchedule( updatedSwapRequest?.fromScheduleId, { userId: updatedSwapRequest?.toUserId } )
    swapSchedule( updatedSwapRequest?.toScheduleId, { userId: updatedSwapRequest?.fromUserId } )
  }
  const title = updatedSwapRequest?.status === "approved" ? "Swap Request Approved" : "Swap Request Declined";
  sendNotification(updatedSwapRequest?.fromUserId, {
    title,
    message: `Your swap request was ${updatedSwapRequest.status}.`,
    type: `Swap ${updatedSwapRequest.status}`,
    priority: "High"
  });

  return updatedSwapRequest
}
