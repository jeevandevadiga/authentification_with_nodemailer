import { now } from "mongoose";
import usermodel from "../../models/user.model.js";
import tempuser from "../../utils/tempuser.js";

async function verifyotp(req, res) {
  try {
    const { otp } = req.body;
    const email = req.cookies.pendingdata;

    //if the email or the otp is missing
    if (!email || !otp) {
      return res.status(401).json({ message: "inavlid email or invalid otp " });
    }

    //taking the data from the memory that was stored to verify the user
    const pendingdata = tempuser.get(email);

     //if we fail to get the pending data from the memory
    if (!pendingdata) {
      return res.status(404).json({ message: "user not found or otp expired" });
    }

    if (pendingdata.otp != otp || Date.now() > pendingdata.otpExpiry) {
      return res.status(401).json({ message: "otp expired or invalid otp" });
    }

   
    const data = await usermodel.create({
      username: pendingdata.username,
      email: pendingdata.email,
      password: pendingdata.password,
      payment:"pending ",
      date: Date.now(),
    });

    tempuser.delete(email);
    res.clearCookie("pendingdata");

    res.status(200).json({ message: "registration successfully done", data });
  } catch (error) {
    res
      .status(400)
      .json({ message: "failed in the verify email ", error: error.message });
  }
}

export default verifyotp;
