const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // this midleware would help data from body to be put on the request object

app.get("/", (req, res) => {
  res.status(200).json({ message: `Hello from the server`, app: "KYC" });
});

// ROUTES
app.use("/api/v1/users", userRouter);

module.exports = app;
