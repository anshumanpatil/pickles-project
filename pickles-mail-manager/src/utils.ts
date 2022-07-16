import nodemailer from "nodemailer";
import { MAIL, PASS } from './config';
console.log(MAIL, PASS);

const sendTestMail = async (body) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: MAIL,
            pass: PASS
        },
    });

    let info = await transporter.sendMail({
        from: '"Pickles" <pickles@pickles.com>',
        to: body.emailTo,
        subject: "Mail from pickles",
        text: body.emailText,
        html: `<b> ${body.emailText}?</b>`,
    });

}

export { sendTestMail }