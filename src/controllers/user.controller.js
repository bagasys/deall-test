const { userService } = require('../services');

const getUsers = (req, res) => {
    const users =  userService.getUsers();
    res.send(users);
};

module.exports = {
  getUsers,
};
