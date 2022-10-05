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

    console.log("STARTING AUTH2");
    console.log("#######################################################");

    var uname = req.body.username.toString();
    console.log(uname);
    var pwd = req.body.password.toString();
    console.log(pwd);
    const assert = require('assert');

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        //console.log(dbo.collection("users").find({'username'}));
        /*
        dbo.collection("users").find({'username':uname, 'password':pwd}).count(function (err, count) {
            assert.equal(null, err);

            if (count > 0) {
                res.send({'username': uname, 'success': true});
            } else {
                res.send({'username': '', 'success': false});
            }
            db.close();
        });
        */
       dbo.collection("users").find({'username':uname, 'password':pwd}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        userInfo = result;
        userInfo[0]["ok"] = true;
        console.log(userInfo[0].role);
        console.log(userInfo.ok);
        console.log(userInfo);
        res.send(userInfo);
        db.close();
        });
    });
}