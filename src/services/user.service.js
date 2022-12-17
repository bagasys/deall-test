const { User } = require("../models");

const getUsers = async () => {
  const users = await User.find();
  return users;
};

const createUser = async (spec) => {
  return User.create(spec);
};

module.exports = {
  getUsers,
  createUser,
};
