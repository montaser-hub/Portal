import express from 'express';
import * as locationController from '../controllers/locationController.js';
import * as authController from '../controllers/authController';
import validation from '../middlewares/validation.js';
import * as locationSchema from '../validators/locationSchema.js';
const locationRouter = express.Router();

locationRouter.use(authController.isAuth);
locationRouter
  .route('/')
  .get(locationController.getLocations)
  .post(validation(locationSchema.createLocationSchema), locationController.addLocation)

locationRouter
  .route('/:id')
  .get(locationController.getLocation)
  .patch(validation(locationSchema.updateLocationSchema), locationController.updateLocation)
  .delete(locationController.deleteLocation);


export default locationRouter
