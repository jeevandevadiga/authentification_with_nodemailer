import mongoose from "mongoose";

async function connection(params) {
  try {
    await mongoose.connect(
      "mongodb+srv://devadigajeevan41_db_user:JpCCbipjWDhvpAZG@cluster0.uzjfs4i.mongodb.net/mailproject",
    );
    console.log(" database connection successfully done");
  } catch (error) {
    console.log("error in the connection page ");
  }
}


export default connection;