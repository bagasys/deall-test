const express = require("express");
const userController = require("../../controllers/user.controller");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");

const router = express.Router();

router
  .route("/")
  .get(validate(userValidation.getUsers), userController.getUsers)
  .post(validate(userValidation.createUser), userController.createUser);

module.exports = router;
