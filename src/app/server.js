// 1st Module
const http = require("http");

// Third Party Module
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ---------------------------------------------------------------------

// Define
const app = express();
const server = http.createServer(app);

// WebSocket (for log)
const { Server } = require("socket.io");
const io = new Server(server);

// Config
app.set("port", process.env.PORT || 8080);

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ---------------------------------------------------------------------

// Manual Import Routers
app.use(require("../routers/KaryawanRouter.js"));
app.use(require("../routers/HelpRouter"));

// 404 : Page Not Found !!!
app.all("*", (req, res) => {
  if (
    !["get", "post", "patch", "delete"].includes(
      String(req.method).toLowerCase()
    )
  ) {
    return res.status(403).send("forbidden");
  }
  return res.status(404).json({
    message: "endpoint not found!",
  });
});

module.exports = { app, server, io };
