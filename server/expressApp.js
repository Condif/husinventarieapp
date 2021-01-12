// Server setup
const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const cors = require("cors");
const mongoose = require("mongoose");
const { run } = require("./mongo");
require("dotenv").config();
const port = process.env.PORT || 8080;
const path = require("path");




app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8080"],
  })
);

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
const sessionRouter = require("./routers/session.router");
const projectRouter = require("./routers/project.router");
const roomRouter = require("./routers/room.router");
const houseRouter = require("./routers/house.router");
const notesRouter = require("./routers/notes.router");
const itemRouter = require("./routers/item.router");

// run the database
run();

app.use(express.urlencoded({ extended: false }));

/* Add API resourses */

app.use(userRouter);
app.use(sessionRouter);
app.use(projectRouter);
app.use(roomRouter);
app.use(houseRouter);
app.use(notesRouter);
app.use(itemRouter)

// Handle production
if(process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static(__dirname + '/public'))

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirName + '/public/index.html'))
}
app.listen(port, () => console.log("Server has started"));
