module.exports = function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    console.log("STARTING AUTH2");
    console.log("#######################################################");

    //Retrieves the username and password
    var uname = req.body.username.toString();
    console.log(uname);
    var pwd = req.body.password.toString();
    console.log(pwd);

    //Checks the users collection for an entry where the username and password match
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
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