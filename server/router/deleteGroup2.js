module.exports = function(req, res) {
    console.log("RUNNING DELETE GROUP 2");
    console.log("###############################################################################");
    console.log("check");
    //Retrieves group name
    let u = {"groupname": req.body.groupname};
    console.log(u);
    let y = u.groupname;
    console.log(y);
    nametaken = false;
    invalidname = false;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    //Checks if groupname is blank
    if (u == {"groupname": ""}) {
        invalidname = true;
        console.log("Empty");
        res.send({
            "invalidname": true
        });
    } else {
        //Deletes group from groups collection with corresponding name
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("users");
            var myquery = { group: y};
            setTimeout(() => {
                dbo.collection("groups").deleteOne(myquery, function(err, obj) {
                    if (err) throw err;
                    console.log("Group Deleted");
                });
            }, 500);
        });
    }
}