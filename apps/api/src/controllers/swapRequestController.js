import * as swapRequestService from '../services/swapRequestService.js'
import catchAsync from "../utils/catchAsync.js";

// Add swapRequest
export const addSwapRequest = catchAsync( async ( req, res, next ) => {
  const data = { ...req.body }
  const swapRequestData = await swapRequestService.addSwapRequest(data)
  res.status(200).json({ message: "swapRequest added successfully", data: swapRequestData });
});

// Get swapRequest By Id
export const getSwapRequest = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const swapRequest = await swapRequestService.getSwapRequest(id)
  res.status(200).json({ message: "swapRequest fetched successfully", data: swapRequest });
});

// Get All swapRequests
export const getSwapRequests = catchAsync(async (req, res, next) => {
  const swapRequests = await swapRequestService.getAllSwapRequests();
  res.status(200).json({ message: "swapRequests fetched successfully", data: swapRequests });
});

// Update swapRequest
export const updateSwapRequest = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const data = { ...req.body }
  const swapRequestData = await swapRequestService.updateSwapRequest(id, data)
  res.status(200).json({ message: "swapRequest updated successfully", data: swapRequestData });
});

// Delete swapRequest By ID
export const deleteSwapRequest = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const deleteSwapRequest = await swapRequestService.deleteSwapRequest(id)
  res.status(200).json({ message: "swapRequest deleted successfully", data: deleteSwapRequest });
});

// Delete All swapRequests
export const deleteAllSwapRequests = catchAsync( async ( req, res, next ) => {
  const deleteSwapRequests = await swapRequestService.deleteAllSwapRequests()
  res.status(200).json({ message: "All swapRequests deleted successfully", data: deleteSwapRequests });
});


