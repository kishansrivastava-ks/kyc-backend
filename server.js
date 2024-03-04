const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

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
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
