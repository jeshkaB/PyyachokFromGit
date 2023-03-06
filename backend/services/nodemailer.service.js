const nodemailer = require("nodemailer");
const {SERVER_EMAIL, SERVER_EMAIl_PASSWORD, SERVER_EMAIl_HOST, SERVER_EMAIL_PORT, SERVER_EMAIL_SECURE} = require("../configs/config");

module.exports = {
    sendEmail: (userEmail,subject,text)=> {
        let transporter = nodemailer.createTransport({
            host: SERVER_EMAIl_HOST,
            port: SERVER_EMAIL_PORT,
            secure: SERVER_EMAIL_SECURE,
            auth: {
                user: SERVER_EMAIL,
                pass: SERVER_EMAIl_PASSWORD
            },
        });

        return transporter.sendMail({
            from: SERVER_EMAIL,
            to: userEmail,
            subject: subject,
            html: `<b>${text}</b>`,
        });
    }

}
