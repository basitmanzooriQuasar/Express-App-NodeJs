const express = require("express");
const app = express();
const tasks = require("./routes/tasks"); //routes
const AppError = require("./utils/appError");
const cors = require("cors");
app.use(cors());
const globalErrorHandler = require("./controllers/errorController");

//middleware
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);
//middleware to handle unhandled requests
app.all("*", (req, res, next) => {
  //   const err = new Error(`Can't find ${req.originalUrl} on this server`);
  //   err.status = "fail";
  //   err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//error handling middleware
app.use(globalErrorHandler);

module.exports = app;
