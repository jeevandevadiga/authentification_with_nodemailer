import usermodel from "../../models/user.model.js";
import passhashing from "../../middleware/passwordcrypt/hashpass.js";
import tempuser from "../../utils/tempuser.js";
import sendotp from "../../middleware/mail/otp.mail.js";
async function register(req, res) {
  try {
    //checking if all the data are present in the request
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({ message: "fill all the datas" });
    }

    //checking if the email is already present in the database

    const checkdata = await usermodel.findOne({ email });

    if (checkdata) {
      return res.status(401).json({ message: "the email is already used " });
    }

    //hashning the password

    const hashpass = await passhashing(password);

    //sending the otp
   
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    tempuser.set(email, {
      username,
      email,
      password: hashpass,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });


    await sendotp(email, otp);
    res.cookie("pendingdata" ,email ,{
      maxAge: 5 * 60 * 1000 
    })

    res.status(200).json({ message: "otp sent successfully" ,otp:otp});
  } catch (error) {
    res.status(401).json({
      message: "failed in the register controller page",
      error: error.message,
    });
  }
}

export default register;
