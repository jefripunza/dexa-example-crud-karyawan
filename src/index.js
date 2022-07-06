require("./config");
require("./utils/logger");

// ---------------------------------------------------------------------
// Server

const { app, server } = require("./app/server");

server.listen(app.get("port"), () => {
  console.log(`Service running at ${app.get("port")}`);
});

// ---------------------------------------------------------------------
// Connection Database

require("./app/database");
