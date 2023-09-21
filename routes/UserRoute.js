const express = require('express');
const tourRoute = express.Router();
const UserController = require('../controller/UserController')


tourRoute
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

tourRoute
  .route('/:id_user')
  .get(UserController.getTourById)
  .patch(UserController.editUserData)
  .delete(UserController.removeUserData);

module.exports = tourRoute;