import express from 'express';
import * as locationController from '../controllers/locationController.js';

const router = express.Router();

router
  .route('/')
  .get(locationController.getLocations)
  .post(locationController.addLocation)
  .delete(locationController.deleteAllLocations);

router
  .route('/:id')
  .get(locationController.getLocation)
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);


export default router
