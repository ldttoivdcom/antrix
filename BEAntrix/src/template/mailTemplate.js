const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});


exports.mailTemplate = (thanksTitle, topContent,bottomContent, ps,reqData, yourCompanyName = "Antrix",yourContactInformation, additionalContact ) => {

   const { firstName, lastName, email, prodService, phone, company, jobTitle, companyWeb, message, pricing, partNo } = reqData;

    return `

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <title>${process.env.TITLE_MAIL_TAB}</title>
</head>
<body style="margin: 0; font-family: 'Poppins', sans-serif; background-color: #f5f5f5;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 640px; background-color: white;">
        <tr>
            <td style="text-align: center; background-color: #0C3C60;">
                <img src="${process.env.IMAGE_BASE_URL}dropdown_header_navigation.png" alt="header" style="width: 100%; height: auto; border: 0;"/>
            </td>
        </tr>

        <tr>
            <td style="padding: 32px; font-size: 16px; line-height: 24px; color: #333333;">
                <p style="text-align: center; margin: 12px 0 0 0">
                    <img src="${process.env.IMAGE_BASE_URL}check_circle.png" alt="tick" style="width: 32px; height: 32px; border: 0;">
                </p>
                <p style="text-align: center; font-weight: 600; font-size: 24px; color: #0C3C60; margin: 15px 0 22px 0;">
                    ${thanksTitle}
                </p>
                <p style="border-top: 1px solid #EAECF0; padding-top: 15px;color: #333333">
                    Dear ${firstName || ""},
                </p>
                <p style="margin: 9px 0;color: #333333">${topContent}</p>
                <p style="margin: 0 0 9px 0;color: #333333">Here are the details you provided:</p>

                <table style="width: 100%; background-color: #F9FAFB;">
                    <tr>
                        <td >
                            <table style="margin-left: 12px;color: #333333">
                                 <tr style="">
                                    <td style="text-align: left; padding-left: 12px ;padding-top: 12px; width: 100%"><span>First Name: ${firstName || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px"><span>Last Name: ${lastName || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px"><span>Email: ${email || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px"><span>Telephone: ${phone || ""}</span></td>
                                </tr>
                              <tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px"><span>Company: ${company || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px"><span>Job Title: ${jobTitle || ""}</span></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px"><span>Company Website: ${companyWeb || ""}</span></td>
                                </tr>
                                ${prodService?`
                                <tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px"><span>Product / Service: ${prodService || "" } </span></td>
                                </tr>` : ""}
                                ${partNo ? `<tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px"><span>Part Number: ${partNo || ""}</span></td>
                                </tr>` : ""}
                                ${pricing ? `<tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px"><span>Pricing: ${pricing || ""}</span></td>
                                </tr>` : ""}
                                <tr>
                                    <td style="text-align: left; padding-left: 12px ; padding-top: 15px; padding-bottom: 12px"><span>Message: ${message|| ""}</span></td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>

                <p style="margin: 9px 0; color: #333333">${bottomContent}</p>
                <p style="margin: 9px 0; color: #333333">${ps}</p>
                <p style="margin: 9px 0; color: #333333;">Best Regards,</p>
                <p style="margin: 9px 0; color: #333333">${yourCompanyName || ""} ${yourContactInformation || ""} ${additionalContact || ""}</p>
            </td>
        </tr>

        <tr style="background-color: #EAECF0;">
            <td style="padding: 12px; text-align: center; font-size: 14px;">
                <p style="margin: 9px 0">@ 2023 Antrix</p>
                <p style="margin: 9px 0">Antrix, Inc819 Peekskill DrSunnyvale, CA 94087</p>
                <p style="margin: 9px 0">www.antrix.com</p>
            </td>
        </tr>
    </table>
</body>
</html>





    `;
}