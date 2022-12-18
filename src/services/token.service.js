const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config/config");
const { Token } = require("../models");
const { tokenTypes } = require("../config/tokens");

const generateToken = (
  userId,
  expiry_in_unix_timestamp,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expiry_in_unix_timestamp,
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expiryDate, type) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expiryDate: expiryDate,
    type,
  });
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires.unix(),
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires.unix(),
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires.toDate(),
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expiryDate: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expiryDate: refreshTokenExpires.toDate(),
    },
  };
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

module.exports = {
  generateToken,
  saveToken,
  generateAuthTokens,
  verifyToken,
};
