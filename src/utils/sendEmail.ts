import * as nodemailer from 'nodemailer';
export const sendEmail = async (email: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    });
   const link = process.env.LINK
    const info = await transporter.sendMail({
      from: process.env.MAIL , // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Confirm your mail Now', // plain text body
      html: `<b>Hello there Click here to confirm your email</b> <a href="${link}">confirm Email</a>`, // html body
    });
  
    console.log('Message sent: %s', info.messageId);
  };
  