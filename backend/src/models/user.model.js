import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  payment: {
    type: String,
    enum: ["pending ", "completed"],
    default: "pending",
  },
  date: { type: Date, default: Date.now },
});

const usermodel = mongoose.model("userdata", userschema);

export default usermodel;
