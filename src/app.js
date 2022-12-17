const express = require("express");
const routes = require("./routes/v1");
const { errorHandler, errorConverter } = require("./middlewares/error");

const app = express();

app.use("/v1", routes);

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
