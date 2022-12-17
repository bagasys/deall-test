const app = require("./app");
const config = require("./config/config");

server = app.listen(config.port, () => {
  console.log(`server is running on PORT ${config.port} in ${config.env} env`);
});
