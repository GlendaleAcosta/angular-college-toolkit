// IMPORTS
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var pgp = require('pg-promise')();
var bcrypt = require('bcrypt-nodejs');

var app = express();
var PORT = process.env.PORT || 3007;

 
// db connection config
var connection = {
    host: 'localhost',
    port: '5433',
    database: 'postgres',
    user: 'postgres',
    password: 'rootpw'
}
var db = pgp(connection); // db connection


 // Allows use of Sass
app.use(sass({
    src: path.join(__dirname , '/public/sass'),
    dest: path.join(__dirname, '/public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css',
    indentedSyntax: true
}));
app.use(express.static(path.join(__dirname, '/public'))); // Serves static files
app.use(bodyParser.json()) // Parses Data 




// Gets Home Page
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/sign-up', validator() , function(req, res){

    // Security
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty();

    req.sanitizeBody('email').normalizeEmail();
    req.sanitizeBody('password');


    req.getValidationResult().then(function(result){
        if (!result.isEmpty()) {
            var error = result.array();
            res.send(error);
            
        } else {
            // THIS SHOULD BE IN THE MODEL
            var email = req.body.email;
            var password = req.body.password;

            // Check if the email is already used
            db.query("SELECT email FROM users WHERE email=$1", [email])
                
                .then(function(data){
                    console.log(data[0].email);
                    
                    if(!data[0].email) {
                       console.log("The email doesn't exist"); 
                       
                        // Password Encryption 
                        bcrypt.hash(password, null, null, function(err, hash){
                            // Database Query Insert new Email and Password
                            password = hash;

                            db.none("INSERT INTO users (email, password) VALUES($1, $2)", [email, password])

                                .then(function(){
                                    //success
                                    console.log("success!");
                                })
                                .catch(function(error){
                                    //error
                                    console.log("error!: " + error);
                            });

                        });

                    } else {
                       console.log("The email exists");
                    }
                })
                .catch(function(error){
                    //error
                    
            });


        }
    });




});



// Starts Server
app.listen( PORT , function(){
    console.log("App is up on port " + PORT);
});