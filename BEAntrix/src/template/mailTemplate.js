const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});


exports.mailTemplate = (reqData) => {

   const { firstName, lastName, email, prodService, phone, company, jobTitle, companyWeb, message, subject, partNo } = reqData;

    return `


<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <title>Contact Us</title>
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins',sans-serif ;
      background-color: #f5f5f5;
    ">
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      align="center"
      width="640px"
      style="padding-top: 32px; padding-bottom: 32px">
      <tr>
        <td>
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            align="center"
            width="100%"
            style="background-color: white; margin: 0 auto">
            <tr>
              <td
                style="
                  text-align: center;
                  margin: 0;
                  height: 80px;
                  color: white;
                ">
                <img
                  src="${process.env.IMAGE_BASE_URL}dropdown_header_navigation.png"
                  alt="header"
                  style="width: 100%; height: 100%; object-fit: cover;pointer-events: none;" />
              </td>
            </tr>

            <tr>
              <td>
                  <table
                  style="
                    padding: 0 32px 30px 32px;
                    font-family: 'Poppins', sans-serif;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    width:100%;

                  ">
                      <tr >
                          <td style="align-items: center;text-align: center; padding: 35px 0;">
                              <img src="${process.env.IMAGE_BASE_URL}check_circle.png" alt="tick" style="padding-bottom: 16px; width: 32px; height: 32px; object-fit: cover;pointer-events: none;">
                                <p style="font-weight: 600; text-align: center; font-size: 24px; color: #0C3C60;margin: 0">Thank you for submitting the form.</p>
                          </td>
                      </tr>
                  <tr>
                    <td style="border-top: 1px solid #EAECF0; padding-top: 16px">
                        <span style="font-weight: 400; text-align: left">
                          Dear, ${firstName || ""}
                        </span>
                    </td>
                  </tr>
                  <tr>
                      <td style="text-align: left; padding-top: 15px">
                          <span>Thank you for reaching out to us. We appreciate your interest in Antrix. Your inquiry about Product / Service: ${prodService || ""} is important to us, and we will make every effort to respond as quickly as possible. </span>
                      </td>
                  </tr>
                  <tr>
                          <td style="text-align: left; padding-top: 15px"><span>Here are the details you provided:</span></td>
                  </tr>
                  <tr style="background-color: #F9FAFB; width: 100%;">
                        <td>
                            <table style="
                            font-family: 'Poppins', sans-serif;
                            font-size: 16px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: 24px;
                            width: 100%;
                            padding: 12px;
                            ">
                              <tr style="">
                                    <td style="text-align: left; width: 100%"><span>First Name: ${firstName || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Last Name: ${lastName || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Email: ${email || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Telephone: ${phone || ""}</span></td>
                                </tr>
                              <tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Company: ${company || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Job Title: ${jobTitle || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Company Website: ${companyWeb || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Product / Service: ${prodService || ""}</span></td>
                                </tr>
                                ${partNo ? `<tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Part Number: ${partNo || ""}</span></td>
                                </tr>` : ""}
                                 <tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Subject: ${subject || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-top: 15px"><span>Message: ${message|| ""}</span></td>
                                </tr>
                          </table>

                        </td>
                  </tr>
                      <tr>
                      <td style="text-align: left; padding-top: 16px"><span>Our team will review your message and get back to you shortly. If your
                          inquiry is urgent, please feel free to contact us directly at ${email || ""}.</span></td>
                    </tr>
                    <tr>
                      <td style="text-align: left; padding-top: 15px"><span>Thank you for considering Antrix. We look forward to assisting you.</span></td>
                    </tr>
                    <tr>
                      <td style="text-align: left; padding-top: 15px"><span>Best Regards,</span></td>
                    </tr>

                </table>

              </td>
            </tr>
               <tr style="background-color: #EAECF0;">
                    <td
                      style="
                        height: auto;
                        padding: 12px;
                        text-align: center;
                        font-size: 14px;
                        font-family: 'Poppins',sans-serif;
                      ">
                        <p style="margin: 9px 0">@ 2023 Antrix</p>
                        <p style="margin: 9px 0">Antrix, Inc819 Peekskill DrSunnyvale,CA 94087</p>
                        <p style="margin: 9px 0">www.antrix.com</p>
                    </td>
                  </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>



    `;
}