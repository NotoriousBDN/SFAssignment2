module.exports = {
    getUser2: function(a, b) {
        var db = require('mongodb').db;
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        console.log("STARTING getUser");
        console.log("#######################################################");

        //Retrives username and password
        var uname = a;
        console.log(uname);
        var pwd = b;
        console.log(pwd);

        
        //Checks users collection for matching results
        MongoClient.connect(url, function(err, db) {
            console.log('mongo running');
            if (err) throw err;
            var dbo = db.db("users");
            dbo.collection("users").find({'username':uname, 'password':pwd}).toArray(function(err, result) {
                //if (err) throw err;
                console.log(result);
                if (result.length != 0) {
                    return true;
                } else if (result.length == 0) {
                    return false
                }
                });
        });
    }
}
