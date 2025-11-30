import * as SwapRequestRepo from '../dataAccess/swapRequestRepo.js'
import AppError from '../utils/AppError.js'
import { getAllDocuments } from './queryService.js'
import { sendNotification } from '../controllers/notificationController.js'
import { swapSchedule } from './scheduleService.js'
import { validateSwapRequest } from './swapValidation.js'
//  Add SwapRequest
export const addSwapRequest = async ( data ) => {
  await validateSwapRequest(data)
  const createdSwapRequest = await SwapRequestRepo.create(data)
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
  await validateSwapRequest(data, { mode: "update", currentSwapId: id })
  const updatedSwapRequest = await SwapRequestRepo.update(id, data)
  if (!updatedSwapRequest) throw new AppError("SwapRequest already existed.", 400)
  sendNotification(updatedSwapRequest?.toUserId, {
    title: " Swap Request",
    message: `Swap request was updated by ${updatedSwapRequest?.fromUser?.fullName}. Check your swap request panel.`,
    type: "Swap Updated",
    priority: "Low"
  })
  return updatedSwapRequest
}

// Delete SwapRequest
export const deleteSwapRequest = async (id) => {
  const swapRequest = await SwapRequestRepo.findById(id)
  if (!swapRequest) throw new AppError("SwapRequest not found.", 404)
  return await SwapRequestRepo.removeById(id)
}

export const IsApproved = async (id, data, user) => {

  const swapRequest = await getSwapRequest(id);

  if (["approved", "rejected", "cancelled"].includes(swapRequest?.status))
    throw new AppError(`SwapRequest already ${swapRequest?.status}.`, 400);

  const toUserAlreadyApproved = swapRequest?.approvalHistory.some(a =>
    a.role === "user" &&
    a?.approvedBy.toString() === swapRequest?.toUserId.toString() &&
    a.status === "approved"
  );
  const toUserRejected = swapRequest.approvalHistory.some(a =>
  a.role === "user" &&
  a.approvedBy.toString() === swapRequest?.toUserId.toString() &&
  a.status === "rejected"
);

if (toUserRejected)
  throw new AppError("User rejected this swap. No further approval allowed.", 400);

  // Prevent double approval by same user
  const alreadyResponded = swapRequest.approvalHistory.some(a =>
    a?.approvedBy.toString() === user?._id.toString()
  );

  if (alreadyResponded)
    throw new AppError("You have already responded to this swap request", 400);

  // Role rules
  if (user.role === "user") {
    if (swapRequest.toUserId.toString() !== user._id.toString())
      throw new AppError("Only the recipient user can approve or reject.", 403);
  }

  // Manager/Admin cannot approve before user
  if (["manager","admin"].includes(user?.role) && !toUserAlreadyApproved)
    throw new AppError("User must approve before operational approval.", 400);

  if (["manager","admin"].includes(user?.role)) {
    if (!isOperationalApprover(user, swapRequest))
      throw new AppError("You are not authorized to approve this swap.", 403);
  }

  // Add approval to history
  swapRequest.approvalHistory.push({
    approvedBy: user?._id,
    role: user?.role,
    status: data?.status,
    message: data.message || ""
  });

  // Compute final status
  const newStatus = computeSwapStatus(swapRequest);
  swapRequest.status = newStatus;
  await swapRequest.save();

  // Perform the swap if fully approved
  if (newStatus === "approved") {
    await swapSchedule(swapRequest.fromScheduleId, { userId: swapRequest?.toUserId });
    await swapSchedule(swapRequest.toScheduleId, { userId: swapRequest?.fromUserId });
  }
  const title = newStatus == "approved" ? "Swap Request Approved" : "Swap Request Declined";
  // Notify creator
  sendNotification(swapRequest?.fromUserId, {
    title,
    message: `Your swap request for ${swapRequest?.fromSchedule?.date.toLocaleDateString()}  is now ${swapRequest.status} by ${user?.fullName}.`,
    type: `swap_${swapRequest.status}`,
    priority: "High"
  });
  if ( String(user?._id) !== String(swapRequest?.toUserId) ) {
    sendNotification( swapRequest?.toUserId, {
      title,
      message: `swap request for ${swapRequest?.toSchedule?.date.toLocaleDateString()}is now ${swapRequest.status} by ${user?.fullName}.`,
      type: `swap_${swapRequest.status}`,
      priority: "High"
    })
  }
  return await getSwapRequest(swapRequest?._id);
};


const isOperationalApprover = (user, swapRequest) => {
  const deptManager = swapRequest?.department?.managerId?.toString();
  const subDeptManager = swapRequest?.toSchedule?.subDepartment?.managerId?.toString();

  if (user.role === 'admin') return true;
  if (user?._id.toString() === deptManager) return true;
  if (user?._id.toString() === subDeptManager) return true;

  return false;
};

const computeSwapStatus = (swapRequest) => {
  const approvals = swapRequest.approvalHistory;

  const toUserApproved = approvals.some(
    (a) =>
      a.role === "user" &&
      a.approvedBy.toString() === swapRequest.toUserId.toString() &&
      a.status === "approved"
  );

  const operationalApproved = approvals.some(
    (a) =>
      ["manager", "admin"].includes(a.role) &&
      a.status === "approved"
  );

  const rejected = approvals.some((a) => a.status === "rejected");

  if (rejected) return "rejected";
  if (toUserApproved && operationalApproved) return "approved";

  return "pending";
};
