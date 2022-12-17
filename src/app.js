const express = require("express");
const routes = require("./routes/v1");
const { errorHandler } = require("./middlewares/error");

const app = express();

app.use("/v1", routes);

app.use(errorHandler);

module.exports = app;
