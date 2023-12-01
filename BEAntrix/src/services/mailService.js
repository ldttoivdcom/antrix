const nodeMailer = require("nodemailer");
const mailTemplate = require("../template/mailTemplate");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

exports.sendMail = async (reqData) => {
    const { firstName, lastName, email, prodService, phone, company, jobTitle, companyWeb, message, pricing, partNo } = reqData;
    const thanksTitle = `Thank you for submitting the form.`;
    const topContent = `Thank you for reaching out to us. We appreciate your interest in Antrix. Your inquiry about Product / Service: ${prodService || ""} is important to us, and we will make every effort to respond as quickly as possible. `
    const bottomContent = `Our team will review your message and get back to you shortly. If your
                          inquiry is urgent, please feel free to contact us directly at support@antrix.com.`
    const ps = `Thank you for considering Antrix. We look forward to assisting you.`
    const transporter = nodeMailer.createTransport({
        host: process.env.SENDER_HOST,
        port: process.env.SENDER_HOST_PORT,
        auth: {
            user: process.env.SENDER,
            pass: process.env.SENDER_PASSWORD
        }
    });

        await transporter.sendMail({
        from:  process.env.SENDER,
        to: `${reqData.email}`,
        cc: process.env.SENDER_CC.split(','),
        subject:  process.env.SENDER_SUBJECT,
        html: mailTemplate.mailTemplate(thanksTitle,topContent, bottomContent, ps, reqData)
        });

}