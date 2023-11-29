const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: ["http://34.42.75.246", "https://antrix.com"],

    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
//     next();
// })
const authRoute = require("./routes/authRoute");
const contactUsRoute = require("./routes/contactUsRoute");
const imageRoute = require("./routes/imageRoute");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/contact-us", contactUsRoute);
app.use("/api/v1/image", imageRoute);

module.exports = app;
