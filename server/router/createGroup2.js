module.exports = function(req, res) {
    console.log("RUNNING CREATE GROUP 2");
    console.log("##################################################################");
    let u = {"groupname": req.body.groupname};
    console.log(u);
    let y = u.groupname;
    console.log(y);
    nametaken = false;
    invalidname = false;
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    if (y.length == 0) {
        invalidname = true;
        console.log("Empty");
        res.send({
            "invalidname": true
        });
    } else {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("users");
            setTimeout(() => {
                dbo.collection("groups").find({'group':y}).toArray(function(err, result) {
                    if (result.length != 0) {
                        console.log("GROUP NAME IN USE");
                        nametaken = true;
                    } else if (result.length == 0) {
                        console.log("GROUP NAME NOT IN USE");
                    }
                    db.close();
                });
            }, 500);
        });
        setTimeout(()=>{
            console.log("GROUP NAME TAKEN: ", nametaken);
            if (nametaken == true) {
                res.send({
                    "nametaken": true
                });
            } else {
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("users");
                    var dbo = db.db("users");
                    dbo.collection("groups").insertOne({ 'group':y, 'rooms':[], 'userList':[] }, function(err, res) {
                        if (err) throw err;
                        console.log("NEW USER ADDED");
                        db.close();
                    });
                });
            }
        }, 1000);
    }
}