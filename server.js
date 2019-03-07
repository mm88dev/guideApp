"use strict";
// node modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const multer = require("multer");
// custom modules
const responder = require("./custom_modules/responder.js");



const app = express();
// express middlewares for responses
app.use(express.static(__dirname + "/public"));
// body-parser middleware for parsing JSON 
app.use(bodyParser.json());



// multer upload folder
var imgUpload = multer({ dest: "uploads/"});



// mongoose connection
mongoose.connect("mongodb://localhost/quiz", { useNewUrlParser: true}).then((connection) => {
    if (connection) {
        console.log("Connected to mongoDb");
    }
}, (err) => {
    if (err) {
        // error handling back to frontend ???????????????
        console.log("An error occured while connecting to mongoDb " + err);
    }
});
// mongoose Schemas / models
const userSchema = mongoose.Schema({
    "username": String,
    "password": String
});
const userModel = mongoose.model("users", userSchema);
const adimnSchema = mongoose.Schema({
    "username": String,
    "password": String
});
const adminModel = mongoose.model("admins", adimnSchema);




// login/registration requests
app.post("/userLogin", (req, res) => {

    responder.userLogin(req, res, userModel);
});
app.post("/userRegistration", imgUpload.single("avatar"), (req, res) => {
    // imgUpload.fields({"name": "images"}, {"maxCount": 4})
    responder.userRegistration(req, res, userModel);
});



app.listen(3000, () => {

    console.log("Listening on port 3000");
});