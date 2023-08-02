const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  console.log("Login middleware");
  next();
});
app.use("/admin", (req, res, next) => {
  console.log("Admin middleware");
  next();
});
app.use("/cd", (req, res, next) => {
  console.log("cd middleware");
  next();
});
app.use("/talent", (req, res, next) => {
  console.log("talent middleware");
  next();
});
app.use("/rep", (req, res, next) => {
  console.log("rep middleware");
  next();
});

app.get("/admin", (req, res) => {
  res.send("Admin Dashboard");
});
app.get("/cd", (req, res) => {
  res.send("Casting Director Dashboard");
});
app.get("/talent", (req, res) => {
  res.send("Talent Dashboard");
});
app.get("/rep", (req, res) => {
  res.send("Representative Dashboard");
});

app.get("*", (req, res) => {
  res.send("Wrong url");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);


