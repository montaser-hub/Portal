import * as locationService from '../services/locationService.js'
import catchAsync from "../utils/catchAsync.js";

// Add Location
export const addLocation = catchAsync( async ( req, res, next ) => {
  const data = { ...req.body }
  const locationData = await locationService.addLocation(data)
  res.status(200).json({ message: "Location added successfully", data: locationData });
});

// Get Location By Id
export const getLocation = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const location = await locationService.getLocation(id)
  res.status(200).json({ message: "Location fetched successfully", data: location });
});

// Get All Locations
export const getLocations = catchAsync(async (req, res, next) => {
  const locations = await locationService.getAllLocations();
  res.status(200).json({ message: "Locations fetched successfully", data: locations });
});

// Update Location
export const updateLocation = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const data = { ...req.body }
  const locationData = await locationService.updateLocation(id, data)
  res.status(200).json({ message: "Location updated successfully", data: locationData });
});

// Delete Location
export const deleteLocation = catchAsync( async ( req, res, next ) => {
  const id = req.params.id
  const location = await locationService.deleteLocation(id)
  res.status(200).json({ message: "Location deleted successfully", data: location });
});

// Delete All Locations
export const deleteAllLocations = catchAsync( async ( req, res, next ) => {
  const locations = await locationService.deleteAllLocations()
  res.status(200).json({ message: "All Locations deleted successfully", data: locations });
});


