// IMPORTS
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var pgp = require('pg-promise')();
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var app = express();
var PORT = process.env.PORT || 3007;

 

 
// Middleware
// ============================================================
app.use(sass({ 
    src: path.join(__dirname , '/public/sass'),
    dest: path.join(__dirname, '/public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css',
    indentedSyntax: true
}));
app.use(express.static(path.join(__dirname, '/public'))); // Serves static files
app.use(bodyParser.json()); // Parses Data
app.use(validator());




// Controllers (Route Handlers)
// ============================================================
var homeController = require("./controllers/home");
var userController = require("./controllers/user");




// Routes
// ============================================================
app.get('/', homeController);
app.post('/sign-up', userController.postSignUp);
app.post('/login', userController.postLogin);




// Start Server
// ============================================================
app.listen( PORT , function(){
    console.log("App is up on port " + PORT);
});