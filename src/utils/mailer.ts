import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const accountMail = process.env.MAIL as string;
const accountPassword = process.env.MAIL_PASSWORD as string;

const sendMail = async (
  email: string,
  mailSubject: string,
  password: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS:true,
      auth: {
        user: accountMail,
        pass: accountPassword,
      },
    });

    await transporter.sendMail({
      from: "WebRadio RadioWorld - BOUKHALFI Mourad <" + accountMail + ">",
      to: email,
      subject: mailSubject,
      text: "Your password is: " +  password
    });
  } catch (err) {
    console.log(err);
  }
};

export { sendMail };
