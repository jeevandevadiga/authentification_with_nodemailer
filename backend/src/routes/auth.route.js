import express from "express"
import register from '../controller/authcontroller/register.auth.js'
import verifyotp from '../controller/authcontroller/verify.otp.js'

const authrouter = express.Router();

authrouter.post("/register" ,register);
authrouter.post("/verifyotp",verifyotp);

export default authrouter;