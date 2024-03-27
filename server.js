const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception. Shutting down!");
  console.log(err.name, err.message);
  process.exit(1); // uncaught exception
});

const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
console.log(process.env.NODE_ENV);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // no need to change these, these are for deprecation warnings
  })
  .then(() => console.log("DB connection successful!"));

// START SERVER
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection. Shutting down!");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // uncaught exception
  });
});
