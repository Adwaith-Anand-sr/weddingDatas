var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({
   name: String,
   address: String,
   amount: Number
});


module.exports = mongoose.model("data", collectionSchema);
