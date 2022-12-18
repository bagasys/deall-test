const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService } = require("../services");
const { response } = require("express");

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUserWithEmailAndPassword(
    email,
    password
  );
  res.send({ user: result.user, tokens: result.tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshToken = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

module.exports = {
  login,
  logout,
  refreshToken,
};
