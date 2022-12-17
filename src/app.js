const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const routes = require("./routes/v1");
const cors = require("cors");

const { errorHandler, errorConverter } = require("./middlewares/error");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(cors());
app.options("*", cors());

app.use("/v1", routes);

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
