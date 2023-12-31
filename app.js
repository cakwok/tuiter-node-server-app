import express from 'express';
import cors from 'cors'
import session from "express-session";
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
import "dotenv/config";

const app = express()

const allowedOrigins = [
  /*'https://a5--sensational-nougat-1bbd5b.netlify.app',
  'http://localhost:3000',*/
  process.env.FRONTEND_URL,
];

console.log("process.env.FRONTEND_URL2", process.env.FRONTEND_URL);
app.use(
  cors({
    credentials: true,
    /*origin: process.env.FRONTEND_URL,*/
    origin: allowedOrigins,
  })
 ); 

 const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("FRONTEND_URL", process.env.FRONTEND_URL);
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}



app.use(
  session(sessionOptions)
);
app.use(express.json());

AuthController(app);
TuitsController(app);
HelloController(app);
UserController(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {});
