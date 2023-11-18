const express = require("express");
const router = express.Router();
const contactUsController = require("../controllers/contactUsController");

router.route("/").post(contactUsController.contactUs);

module.exports = router;