const nodemailer = require("nodemailer");





module.exports.email = async function email(to, subject, mail_body, main_html) {
    const transport  = await nodemailer.createTransport({
        host: "gmail",
        port: 465,
        secure: true,
        auth : {
            user: "ina.infinity94@gmail.com",
            pass: "721843694d"
        }
    })

   
    return await transport.sendMail({
        from: `The Saga  <ina.infinity94@gmail.com>`,
        to,
        subject,
        text: mail_body,
        html: main_html,
    });
}