import nodemailer from "nodemailer";

async function sendotp(email, otp) {
  try {
    
    const transport = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILPASS,
      },
    });

    const sendmail = await transport.sendMail({
      from: process.env.MAIL,
      to: email,
      subject: "use the otp to register your account",
      text: `this is you otp ${otp}`,
    });

    console.log("otp sent successfully");
  } catch (error) {
    console.log("error in the mail page", error);
  }
}


export default sendotp;