module.exports = function(req, res) {
    console.log("RUNNING CREATE GROUP 2");
    console.log("##################################################################");
    //Retrieves the groupname
    let u = {"groupname": req.body.groupname};
    console.log(u);
    let y = u.groupname;
    console.log(y);
    nametaken = false;
    invalidname = false;
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    //Check if the groupname is blank
    if (y.length == 0) {
        invalidname = true;
        console.log("Empty");
        res.send({
            "invalidname": true
        });
    } else {
        //Checks groups collection for any entries where the group name is found
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
        //Validation if group already exists
        setTimeout(()=>{
            console.log("GROUP NAME TAKEN: ", nametaken);
            if (nametaken == true) {
                res.send({
                    "nametaken": true
                });
            } else {
                //Inserts a new entry with the groupname
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