import * as swapRequestService from '../services/swapRequestService.js'
import catchAsync from "../utils/catchAsync.js";

// Add swapRequest
export const addSwapRequest = catchAsync( async ( req, res, next ) => {
  const data = { ...req.body }
  const user = req?.user
  data.fromUserId = user._id
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
export const getSwapRequests = catchAsync( async ( req, res, next ) => {
  const query = {...req.query}
  const {data, total, totalFiltered} = await swapRequestService.getAllSwapRequests(query);
  res.status( 200 ).json( {
    message: "swapRequests fetched successfully",
    totalFiltered,
    total,
    limit: query.limit,
    page: query.page,
    data
  } );
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
  await swapRequestService.deleteSwapRequest(id)
  res.status(200).json({ message: "swapRequest deleted successfully"});
});


