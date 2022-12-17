const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

const isEmailTaken = async function (email, excludeUserId) {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const createUser = async (spec) => {
  if (await isEmailTaken(spec.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(spec);
};

const getUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const updateUserById = async (userId, spec) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (spec.email && (await isEmailTaken(spec.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, spec);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
