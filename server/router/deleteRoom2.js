module.exports = function(req, res) {
    console.log("RUNNING DELETE ROOM 2");
    console.log("##################################################################");
    //Retrieves group name and room name
    let groupInfo = {
        "group": req.body.groupname,
        "room": req.body.roomname,
    }
    console.log(groupInfo);
    a = groupInfo.group;
    b = groupInfo.room;
    roomNameTaken = false;
    nametaken = false;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    //Checks if values are blank
    if (a === "" || b === "") {
        console.log("Is Null");
        res.send({
            "emptyfield" : true
        });
    } else {
        //Check if the group and room names exist
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
                        console.log(result[0]['rooms']);
                        for (let i=0; i < result[0].rooms.length; i++) {
                            if (result[0].rooms[i] == b) {
                                roomNameTaken = true;
                                console.log("FOUND ROOM");
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
            //Validates
            setTimeout(() => {
                if (nametaken == false) {
                    console.log("Group Name Does Not Exist")
                } else if (roomNameTaken == false) {
                    console.log("Room Name Does Not Exist");
                } else if (roomNameTaken == true || nametaken == true) {
                    //Remove room from rooms
                    console.log("NEW CODE");
                    queryResult[0].rooms.splice(indexVal, 1);
                    console.log(queryResult[0]);
                    //Insert updates room list into groups collection
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("users");
                        myquery = { group: a};
                        newvalues = { $set: {rooms: queryResult[0].rooms} };
                        setTimeout(() => {
                            dbo.collection("groups").updateOne(myquery, newvalues, function(err, res) {
                                if (err) throw err;
                                console.log("ROOM REMOVED");
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