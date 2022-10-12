module.exports = {
    auth2: function(a, b) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        console.log("STARTING AUTH2");
        console.log("#######################################################");

        //Retrieves the username and password

        //Checks the users collection for an entry where the username and password match
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("users");
            dbo.collection("users").find({'username':a, 'password':b}).toArray(function(err, result) {
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
}