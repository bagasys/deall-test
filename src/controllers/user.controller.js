const { userService } = require("../services");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  res.send(users);
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  getUsers,
  createUser,
};
