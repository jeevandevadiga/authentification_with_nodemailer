import express from "express"
import authrouter from '../routes/auth.route.js'
import cookieparser from "cookie-parser"


const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(authrouter);



export default app;

