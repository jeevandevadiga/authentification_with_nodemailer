import app from "./src/server/app.js"
import connection from './src/db/connection.js'
import dotenv from "dotenv";
dotenv.config();

connection();
const port = process.env.PORT || 3000;
console.log("PORT from env:", process.env.PORT);




app.listen(port, () => {
  console.log(`server working in the port ${port}`);
});
