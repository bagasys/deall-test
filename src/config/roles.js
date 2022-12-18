const allRoles = {
  user: ["getUsers", "getUser"],
  admin: ["createUser", "getUsers", "getUser", "updateUser", "deleteUser"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
