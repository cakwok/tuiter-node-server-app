import express from 'express';
import cors from 'cors'
import session from "express-session";
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
import "dotenv/config";
import axios from 'axios';
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const app = express()

console.log("process.env.FRONTEND_URL", process.env.FRONTEND_URL);
console.log("process.env.DB_CONNECTION_STRING", process.env.DB_CONNECTION_STRING);

const allowedOrigins = [
  'https://a5--sensational-nougat-1bbd5b.netlify.app',
  'https://a6--sensational-nougat-1bbd5b.netlify.app/#/tuiter/home',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  '*'
];

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
    /*origin: allowedOrigins,*/
  })
 ); 

 const yelpApiKey = process.env.REACT_APP_YELP_API_KEY;
 const yelpApiUrl = 'https://api.yelp.com/v3/businesses/search';
 const yelpApiUrl_id = 'https://api.yelp.com/v3/businesses';

 // Define a route to proxy requests to Yelp API
 app.get('/proxy/yelp', async (req, res) => {
  const { ...queryParams } = req.query;
   

  try {
    const response = await axios.get(`${yelpApiUrl}`, {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`,
        Accept: 'application/json',
      },
      params: queryParams,
    });

      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  });

  app.get('/proxy/yelp/:id', async (req, res) => { 
    try {
      const response = await axios.get(`${yelpApiUrl_id}/${req.params.id}`, {
        headers: {
          Authorization: `Bearer ${yelpApiKey}`,
          Accept: 'application/json',
        },
      });
      res.json(response.data);
      } catch (error) {
        res.status(error.response.status).json(error.response.data);
      }
    });

    
 const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

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
