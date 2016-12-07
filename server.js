var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 3007;

app.use(express.static(path.join(__dirname, '/public'))); // Serves static files in public folder


app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.listen( PORT , function(){
    console.log("App is up on port " + PORT);
});