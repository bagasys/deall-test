const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const httpStatus = require("http-status");
const mongoSanitize = require("express-mongo-sanitize");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");

const { errorHandler, errorConverter } = require("./middlewares/error");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());
app.use(mongoSanitize());

app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
