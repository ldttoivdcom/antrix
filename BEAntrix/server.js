const dotenv = require("dotenv");
const app = require("./src/app");
const mongoose = require("mongoose");
const db = require("./src/database/dbConfig");
dotenv.config({
  path: "./config.env",
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
