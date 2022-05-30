const mongoose = require("mongoose");
const express = require("express");
const personsRoutes = require("./src/routes/router");
const homeRouter = require("./src/routes/home.js");
var app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "../public"));
var port = 3000;

app.use(personsRoutes);
app.use(homeRouter);

app.use("/", function (req, res, next) {
  console.log("Request  Url" + req.url);
  next();
});
console.log(port);
app.listen(port);
