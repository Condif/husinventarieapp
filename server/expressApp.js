// Server setup
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { run } = require("./mongo");
require("dotenv").config();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(express.json());

/* Import routes */

const userRouter = require("./routers/user.router");

// run the database
run();

// Make sure to parse req.body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Add API resourses */

app.use(userRouter);


app.listen(port, () => console.log('Server has started'))