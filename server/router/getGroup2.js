module.exports = function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    var uname = req.body.username.toString();
    console.log("#################################################################");
    console.log("Begining GetGroup2.js");
    console.log(uname);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("groups").find({'userList':uname}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        /*
        userInfo = result;
        userInfo[0]["ok"] = true;
        console.log(userInfo[0].role);
        console.log(userInfo.ok);
        console.log(userInfo);
        res.send(userInfo);
        */
        res.send(result);
        db.close();
        });
    });
}