const dotenv = require("dotenv");
const app = require("./src/app");
const mongoose = require("mongoose");
const fs = require("fs");
const db = require("./src/database/dbConfig");
dotenv.config({
  path: "./config.env",
});
const http = require('http');
const https = require('https');

const privateKey  = fs.readFileSync('./src/ssl/example.key', 'utf8');
const certificate = fs.readFileSync('./src/ssl/example.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}...`);
// });

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443, () => {
  console.log(`App running on port 8443`);
});
