import express from 'express';
import * as locationController from '../controllers/locationController.js';

const locationRouter = express.Router();

locationRouter
  .route('/')
  .get(locationController.getLocations)
  .post(locationController.addLocation)
  .delete(locationController.deleteAllLocations);

locationRouter
  .route('/:id')
  .get(locationController.getLocation)
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);


export default locationRouter
