module.exports = {
    addUserGroup2: function(a, b) {
        console.log("RUNNING ADD USER 2");
        console.log("##################################################################");
        //Retrieves the name of the group and the user
        userTaken = false;
        nametaken = false;

        
        //Connects to mongoDB
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        //Validation if either are blank
        if (a === "" || b === "") {
            console.log("Is Null");
            res.send({
                "emptyfield" : true
            }); 
        } else {
            //Check the groups collection for any group with the same name
            //Will also check if the user is already in the group
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
            //Will check if any of the error were fulfilled
            //Otherwise will add the user to the userlist and update the db
                setTimeout(() => {
                    if (nametaken == false) {
                        console.log("Group Name Does Not Exist")
                    } else if (userTaken == true) {
                        console.log("User Already Added");
                    } else if (userTaken == false || nametaken == true) {
                        //console.log(result[0].rooms);
                        console.log("NEW CODE");
                        queryResult[0].userList.push(b);
                        console.log(queryResult[0]);
                        MongoClient.connect(url, function(err, db) {
                            if (err) throw err;
                            var dbo = db.db("users");
                            myquery = { group: a};
                            newvalues = { $set: {userList: queryResult[0].userList} };
                            setTimeout(() => {
                                dbo.collection("groups").updateOne(myquery, newvalues, function(err, res) {
                                    if (err) throw err;
                                    console.log("User Added");
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
}