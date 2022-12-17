const app = require("./app");
const config = require("./config/config");
const mongoose = require("mongoose");

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log("Connected to MongoDB");
  server = app.listen(config.port, () => {
    console.log(
      `server is running on PORT ${config.port} in ${config.env} env`
    );
  });
});
