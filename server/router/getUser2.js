/*
module.exports = { auth2 };

function auth2() {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("users").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}
*/

module.exports = function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    console.log("STARTING getUser");
    console.log("#######################################################");

    var uname = req.body.username.toString();
    console.log(uname);
    var pwd = req.body.password.toString();
    console.log(pwd);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("users").find({'username':uname, 'password':pwd}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length != 0) {
            console.log("not empty");
            console.log(result);
            console.log([]);
            console.log('[]');
            userInfo = result;
            userInfo[0]["ok"] = true;
            console.log(userInfo[0].role);
            console.log(userInfo.ok);
            console.log(userInfo);
            res.send(userInfo);
        } else if (result.length == 0) {
            console.log("EMPTY");
            res.send({"ok": false});
        }
        db.close();
        });
    });
}