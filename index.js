const express = require("express");

const bodyparser = require("body-parser");

const sequelize = require("./util/database");

const userModel = require("./models/userModel");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Orgin", "*");
  res.setMethods("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
  next();
});

//test route
app.get("/", (req, res, next) => {
  res.send("hello world");
});

//crude routes

app.use("/users", require("./routes/userRoute"));

//error handling

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//sync database
sequelize
  .sync()
  .then((result) => {
    console.log("database is connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
