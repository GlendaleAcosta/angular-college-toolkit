module.exports = (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
}