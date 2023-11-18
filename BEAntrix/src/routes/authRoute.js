const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
router.route("/login").post(authController.login);
router.route("/register").post(authController.register);
router.route("/me").get(authController.me);
module.exports = router;
