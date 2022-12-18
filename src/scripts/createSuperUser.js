const config = require("../config/config");
const mongoose = require("mongoose");
const User = require("../models/user.model");

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log("Connected to MongoDB");
  User.create(
    {
      email: "admin1@gmail.com",
      name: "admin",
      password: "12345678a",
      role: "admin",
    },
    () => {
      process.exit();
    }
  );
});
