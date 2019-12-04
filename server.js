const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(logger);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} at ${new Date()}`);
  next();
}

module.exports = server;
