import bcrypt from "bcrypt";

async function passhashing(password) {
  try {
    const salttime = 10;
    const hashedpass = await bcrypt.hash(password, salttime);

    return hashedpass;
  } catch (error) {
    console.log("error while hashing the password",error);
  }
}

export default passhashing;
