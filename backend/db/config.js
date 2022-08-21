const dotenv = require("dotenv").config();
const connect = process.env.DATABASE;
const mongoose = require("mongoose");
mongoose.connect(connect);

