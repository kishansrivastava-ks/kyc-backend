const express = require("express");
const morgan = require("morgan"); // to get the request data on the console
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const cors = require("cors"); // for CORS

const userRouter = require("./routes/userRoutes");
const mentorRouter = require("./routes/mentorRoutes");
const collegeRouter = require("./routes/collegeRoutes");
const updatesRouter = require("./routes/updatesRoutes");
const applicationRouter = require("./routes/applicationRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// IMPLEMENTING CORS
app.use(cors());
app.options("*", cors());

app.use(express.json()); // this midleware would help data from body to be put on the request object

app.get("/", (req, res) => {
  res.status(200).json({ message: `Hello from the server`, app: "KYC" });
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// ROUTES
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/mentors", mentorRouter);
app.use("/api/v1/colleges", collegeRouter);
app.use("/api/v1/updates", updatesRouter);

// catching unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// error handling middleware
app.use(globalErrorHandler);
module.exports = app;
