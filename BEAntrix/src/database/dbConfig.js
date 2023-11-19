const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
  path: "./config.env",
});

const uri = process.env.MONGO_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "AMPLE",
});
const db = mongoose.connection;

module.exports = db;
