const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(
    auth("createUser"),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    auth("getUsers"),
    validate(userValidation.getUsers),
    userController.getUsers
  );

router
  .route("/:userId")
  .get(
    auth("getUser"),
    validate(userValidation.getUser),
    userController.getUser
  )
  .patch(
    auth("updateUser"),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    auth("deleteUser"),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

module.exports = router;
