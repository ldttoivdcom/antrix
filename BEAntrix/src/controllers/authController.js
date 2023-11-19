const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const authServices = require("../services/authService");
exports.login = async (req, res) => {
try {
  let reqData = req.body;
  let user = await User.findOne({email: reqData.email}).exec();
    if (!user) {
      return res.status(400).json({
        code: "400",
        message: "Login failed",
        error: "User not found",
      })
    }
    const passwordMatch = await bcrypt.compare(reqData.password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        code: "400",
        message: "Login failed",
        error: "Password incorrect",
      });
    }
     return res.status(200).json({
      code: "200",
      message: "Login successful",
      data:{
        user: user.toJSON(),
        token: authServices.signToken(user.id,user.email),
      },
    });
}catch (e) {
    return res.status(400).json({
        code: "400",
        message: "Login failed",
        error: e.toString(),
    });
}
};

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
    userName: req.body.userName || "",
    email: req.body.email || "",
    password: hashedPassword,
  });
  newUser.save();
  return res.status(200).json({
    code: "200",
    message: "Register successful",
    data: newUser,
  });
  }catch (e) {
    return res.status(400).json({
      code: "400",
      message: "Register failed",
      error: e.toString(),
    });
  }
};

exports.me =async (req, res) => {
  return res.status(200).json({code: "200", message: "Me"});
}
