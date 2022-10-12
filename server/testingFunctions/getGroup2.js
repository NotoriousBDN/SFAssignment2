module.exports = function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    //Retrieves username
    var uname = req.body.username.toString();
    console.log("#################################################################");
    console.log("Begining GetGroup2.js");
    console.log(uname);

    //Retrieves result from search userList for that name from groups collection
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("groups").find({'userList':uname}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
        });
    });
}