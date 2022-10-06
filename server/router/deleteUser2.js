module.exports = function(req, res) {
    let u = {"username": req.body.username};
    let y = u.username;
    console.log("DELETE USER RUNNING");
    console.log("#####################################################################");
    console.log("username: ", y);
    nametaken = false;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        var myquery = { username: y};
        setTimeout(() => {
            dbo.collection("users").deleteOne(myquery, function(err, obj) {
                if (err) throw err;
                console.log("User Removed");
            });
        }, 500);
    });
}   