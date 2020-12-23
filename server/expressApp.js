// Server setup
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { run } = require("./mongo");
require("dotenv").config();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(express.json());


// run the database
run();

// app.use('/api/users', usersRouter)

app.listen(port, () => console.log('Server has started'))