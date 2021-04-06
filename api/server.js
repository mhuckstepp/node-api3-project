const express = require("express");
const userRouter = require("./users/users-router");
const middleware = require("./middleware/middleware");

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here

server.use("/api/users", middleware.logger, userRouter);

server.get("/", middleware.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    custom: "Went bad",
    stack: err.stack,
  });
});

module.exports = server;
