const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});


exports.mailTemplate = (name="", email="", message="",phone="", job="") => {
    return `

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      rel="stylesheet" />
    <title>Contact Us</title>
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Inter', sans-serif ;
      background-color: #f5f5f5;
    ">
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      align="center"
      width="580px"
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
                  margin: 15px 0;
                  height: 120px;
                  color: white;
                  align-items: center;
                  padding: 30px 0;
                ">
                <img
                  src=""
                  alt="header"
                  style="width: 100%; height: 100%; object-fit: cover;pointer-events: none;" />
              </td>
            </tr>

            <tr>
              <td>

                  <table
                  style="
                    padding: 0 32px;
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    width:100%;

                  ">
                      
                  <tr>
                    <td style="border-top: 1px solid #EAECF0; padding-top: 10px">
                        <p style="font-weight: 700; text-align: left">
                          Hi, ${name}
                        </p>
                    </td>
                  </tr>
                  <tr>
                      <td style="text-align: center; padding-top: 15px">
                          <span>Thank you for reaching out to Antrix. We have received your query from email address ${email}. Someone from our team will contact you regarding your inquiry shortly. </span>
                      </td>
                  </tr>
                  <tr>
                          <td style="text-align: center; padding-top: 15px"><span>Please be patient.</span></td>
                  </tr>
                  <tr>
                          <td style="text-align: center; padding-top: 15px"><span>Thanks, Antrix team</span></td>
                  <tr style="height: 44px"></tr>
                  <tr>
                    <td
                      style="
                        height: auto;
                        padding-top: 32px;
                        padding-bottom: 32px;
                        border-top: 1px solid #eaecf0;
                      ">
                      <table
                        align="center"
                        style="
                          color: #475467;
                          font-size: 14px;
                          font-style: normal;
                          font-weight: 400;
                          line-height: 20px;
                        ">
                        <tr>
                          <td colspan="2" style="text-align: center;font-weight: 700;font-size: 16px">
                            <a
                              href="#"
                              style="margin-right: 16px; color: #475467;font-family: 'Inter', sans-serif;text-decoration: none"
                              >Home</a>
                            <a
                              href="#"
                              style="margin-right: 16px; color: #475467;font-family: 'Inter', sans-serif;text-decoration: none"
                              >About us</a>
                            <a
                              href="#"
                              style="margin-right: 16px; color: #475467;font-family: 'Inter', sans-serif;text-decoration: none"
                              >Canada Visa</a>
                            <a href="#" style="color: #475467;font-family: 'Inter', sans-serif;margin-right: 16px;text-decoration: none"
                            >Blog</a>
                            <a href="#" style="color: #475467;font-family: 'Inter', sans-serif;text-decoration: none"
                            >Contact</a>
                          </td>
                        </tr>
                        <tr style="height: 24px"></tr>

                        <tr>
                          <td
                            colspan="2"
                            style="text-align: center; vertical-align: middle;font-family: 'Inter', sans-serif">
                            <span>12830 80 Ave #209, Surrey, BC V3W 3A8</span>
                              <p>Front Desk: +1-89-636-48018</p>
                          </td>
                        </tr>
                        <tr style="height: 12px"></tr>
                        <tr>
                          <td
                            style="
                              text-align: center;
                              width: 100%;
                            ">
                            <a href="#" style="cursor: pointer;text-decoration: none">
                            <img
                              src="${process.env.IMAGE_BASE_URL}/tw.png"
                              alt="icon_mail"
                              style="
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                              " />
                                </a>
                            <a href="#" style="cursor: pointer;text-decoration: none;  margin: 0 16px;">
                            <img
                              src="${process.env.IMAGE_BASE_URL}fb.png"
                              alt="icon_mail"
                              style="
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                              " />
                              </a>
                              <a href="#" style="cursor: pointer;text-decoration: none;">
                              <img
                              src="${process.env.IMAGE_BASE_URL}ig.png"
                              alt="icon_mail"
                              style="
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                              " />
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>

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