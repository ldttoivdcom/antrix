const nodeMailer = require("nodemailer");
const mailTemplate = require("../template/mailTemplate");
require('dotenv').config();

exports.sendMail = async (email, name, message) => {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'no-reply@neoprototype.ca',
            pass: 'hdhk fbhe ltah vcmv'
        }
    });
        await transporter.sendMail({
        from: 'no-reply@neoprototype.ca',
        to: `${email}`,
        subject: 'Contact us',
        html: mailTemplate.mailTemplate(name,email)
        });

}