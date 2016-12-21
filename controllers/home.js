module.exports = function(req, res){
    res.sendFile(__dirname + "/public/index.html");
}