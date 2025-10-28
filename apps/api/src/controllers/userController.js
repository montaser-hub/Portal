import * as userService from '../services/userService.js'
import catchAsync from "../utils/catchAsync";


// Regular User
export const myProfile = catchAsync( async ( req, res, next ) => {
  res.status(200).json({ message: "User fetched successfully" });
})


export const updateMyProfile = catchAsync( async ( req, res, next ) => {
  res.status(200).json({ message: "User updated successfully" });
})


export const updateMyPassword = catchAsync( async ( req, res, next ) => {
  res.status(200).json({ message: "User password updated successfully" });
})


// Admin, Manager
export const addUser = catchAsync( async ( req, res, next ) => {
  const data = { ...req.body }

  const userData = await userService.addUser(data)
  res.status(200).json({ message: "User added successfully", data: userData });
});


export const updateUser = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const data = { ...req.body }
  const updatedUser = await userService.updateUser(id, data)
  res.status(200).json({ message: "User updated successfully", data: updatedUser });
});


export const deleteUser = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: "User deleted successfully" });
});


export const getUser = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const user = await userService.getUser(id)
  res.status(200).json({ message: "User fetched successfully", data: user });
});


export const getUsers = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: "Users fetched successfully" });
});

