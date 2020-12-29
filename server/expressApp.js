// Server setup
const express = require('express')
const app = express()
const cookieSession = require("cookie-session");
const mongoose = require('mongoose')
const { run } = require("./mongo");
require("dotenv").config();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(express.json());

// cookieSession skickar med req.session till alla req, s
//så vi kan komma åt allt vi sparar i req.session globalt.
app.use(
    cookieSession({
      name: "LoginSession",
      secret: "GuppA4Lyf3-geeks",
      // maxAge: 24 * 60 * 60 * 1000, //24 hours
      maxAge: 1000 * 60 * 60, //1 hour
      // maxAge: 30 * 60 * 1000, //30 minutes
      // maxAge: 60 * 1000, //1 minute
      // maxAge: 15 * 1000, //15 seconds
      // maxAge: 10 * 1000, //10 seconds
      // maxAge: 5 * 1000, //5 seconds
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    })
  );
  
/* Import routes */

const userRouter = require("./routers/user.router");

// run the database
run();

app.use(express.urlencoded({ extended: false }));

/* Add API resourses */

app.use(userRouter);


app.listen(port, () => console.log('Server has started'))