var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 3007;
var sass = require('node-sass-middleware');

 

// Uses Sass
app.use(sass({
    src: path.join(__dirname , '/public/sass'),
    dest: path.join(__dirname, '/public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css',
    indentedSyntax: true
}));

app.use(express.static(path.join(__dirname, '/public'))); // Serves static files in public folder



app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.listen( PORT , function(){
    console.log("App is up on port " + PORT);
});