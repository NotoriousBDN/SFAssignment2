module.exports = function(req, res) {
    console.log("RUNNING DELETE ROOM 2");
    console.log("##################################################################");
    let groupInfo = {
        "group": req.body.groupname,
        "user": req.body.user,
    }
    console.log(groupInfo);
    a = groupInfo.group;
    b = groupInfo.user;
    userTaken = false;
    nametaken = false;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    if (a === "" || b === "") {
        console.log("Is Null");
        res.send({
            "emptyfield" : true
        });
    } else {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("users");
            setTimeout(() => {
                dbo.collection("groups").find({'group':a}).toArray(function(err, result) {
                    setTimeout(() => {
                        queryResult = result;
                        if (result.length != 0) {
                        nametaken = true;
                        console.log("Found Group");
                        console.log(result);
                        console.log(result[0]['userList']);
                        for (let i=0; i < result[0].userList.length; i++) {
                            if (result[0].userList[i] == b) {
                                userTaken = true;
                                console.log("FOUND USER");
                                indexVal = i;
                            }
                        }
                    } else {
                        nametaken = false;
                        console.log("Group does not exist");
                    }
                    }, 500);
                db.close();
                });
            }, 500);
        });
            setTimeout(() => {
                if (nametaken == false) {
                    console.log("Group Name Does Not Exist")
                } else if (userTaken == false) {
                    console.log("User Does Not Exist In Group");
                } else if (userTaken == true || nametaken == true) {
                    //console.log(result[0].rooms);
                    console.log("NEW CODE");
                    queryResult[0].userList.splice(indexVal, 1);
                    console.log(queryResult[0]);
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("users");
                        myquery = { group: a};
                        newvalues = { $set: {userList: queryResult[0].userList} };
                        setTimeout(() => {
                            dbo.collection("groups").updateOne(myquery, newvalues, function(err, res) {
                                if (err) throw err;
                                console.log("USER REMOVED");
                                db.close();
                            });
                        }, 1000);
                    });
                } else {
                    console.log("NOT WORKING");
                }
            }, 1500)
    }
}