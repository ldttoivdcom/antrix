const nodeMailer = require('nodemailer');
const mailTemplate = require('../template/mailTemplate');
const mailServices = require('../services/mailService');
exports.contactUs = async (req, res) => {
   try {
        const reqData = req.body;
        await mailServices.sendMail(reqData.email, reqData.name, reqData.message)
        return res.status(200).json({code: "200", message: "Thank you for contacting us"});
   }catch (e) {
       return res.status(400).json({code: "400", message: "Contact us failed", error: e.toString()});
   }
}