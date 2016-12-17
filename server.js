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

 
// db connection config
var connection = {
    host: 'localhost',
    port: '5433',
    database: 'postgres',
    user: 'postgres',
    password: 'rootpw'
}
var db = pgp(connection); // db connection


 
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

    // Error Results
    req.getValidationResult().then(function(result){
        // If there are error results
        if (!result.isEmpty()) {
            var error = result.array();
            return res.send(error);
            
        }
    });
    // THIS SHOULD BE IN THE MODEL -----------------------
    var email = req.body.email;
    var password = req.body.password;

    // Check if the email is already used
    db.query("SELECT email FROM users WHERE email=$1", [email])
    
        .then(function(data){

            // If email exists
            if(data.length > 0) {
                console.log("The email exists");
                return res.json({ 
                    msg: "An account with that email address already exists",
                    signUpSuccess: false
                });
            }      

            
            // Email does NOT exist (A new account can be made)
            // Password Encryption 
            bcrypt.hash(password, null, null, function(err, hash){
                // Database Query Insert new Email and Password
                password = hash;

                db.none("INSERT INTO users (email, password) VALUES($1, $2)", [email, password])

                    .then(function(){
                        //success 
                        res.json({ 
                            msg: "Congratulations, your account has been made!",
                            signUpSuccess: true
                        });
                    })
                    .catch(function(error){
                        //error
                        console.log("error!: " + error);
                    });

            });

                
        })

        .catch(function(error){
            //error
            console.log(error);
                
    });

    // END MODEL ----------------------------------------------------------
        




});


app.post('/login', validator(), function(req, res){

    

    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty();

    req.sanitizeBody('email').normalizeEmail();
    req.sanitizeBody('password');

    req.getValidationResult().then(function(result) {

       // If there are error results
       if (!result.isEmpty()) {
            var error = result.array();
            return res.send(error);

       }

    });

    var email = req.body.email;
    var password = req.body.password;   
    
    db.query("SELECT email, password FROM users WHERE email=$1", [email])

        .then(function(data){

            if (data.length === 0) {
                res.json({
                    msg: "Password or email is incorrect.",
                    loginSuccess: false
                });
            }
            
                // Compares password input and password in database
            bcrypt.compare(password, data[0].password, function(error, result){
                
                if(result === false) {
                    return res.json({
                        msg: "Password or email is incorrect.",
                        loginSuccess: false
                    });
                }

                
                // Generate a json web token
                var token = jwt.sign({
                    email: req.body.email
                }, "my_secret");

                console.log(token);

                return res.json({
                    msg: "Logged in as " + email,
                    loginSuccess: true,
                    token: token 
                });

            });
                
    });
       
});

app.post('/authenticate', function(req,res){

});


// Starts Server
app.listen( PORT , function(){
    console.log("App is up on port " + PORT);
});