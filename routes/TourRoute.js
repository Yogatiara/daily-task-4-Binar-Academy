const express = require('express');
const tourRoute = express.Router();
const TourController = require('../controller/TourController')


tourRoute
  .route('/')
  .get(TourController.getAllTours)
  .post(TourController.createTour);

tourRoute
  .route('/:id')
  .get(TourController.getTourById)
  .patch(TourController.editTour)
  .delete(TourController.removeTour);


module.exports = tourRoute;