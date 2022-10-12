module.exports = function(req, res) {
    //Retrieves username
    let u = {"username": req.body.username};
    let y = u.username;
    console.log("DELETE USER RUNNING");
    console.log("#####################################################################");
    console.log("username: ", y);
    nametaken = false;

    //Connects to mongoDB
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    //Deletes user from users collection with selected name
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