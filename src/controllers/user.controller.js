const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  res.send(users);
});

module.exports = {
  getUsers,
};
