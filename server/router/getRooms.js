var fs = require('fs');

module.exports = function(req, res) {
    var u = req.body.username;
    console.log(u);
    fs.readFile('./data/newUsers.json', 'utf8', function(err, data) {
        // the above path is with respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data);
        console.log(userArray);
        let i = userArray.findIndex(user =>
            (user.username == u));
        if (i == -1) {
            res.send({
                "ok": false
            });
        } else {
            role = userArray[i].role;
            if (role == 0) {
                role = "No Role";
            } else if (role == 1) {
                role = "Group Assistant";
            } else if (role == 2) {
                role = "Group Admin";
            } else if (role == 3) {
                role = "Super Admin";
            }
            console.log("Role: ",role);
            apple = userArray[i];
            apple["ok"] = true;
            fs.readFile('./data/groups.json', 'utf8', function(err, data) {
                // the above path is with respect to where we run server.js
                if (err) throw err;
                let extendedUserArray = JSON.parse(data);
                console.log(extendedUserArray);
                console.log(extendedUserArray[0].userList);
                //let i = extendedUserArray.findIndex(user =>
                //    ((user.userList == u)));

                let userData = extendedUserArray[0];

                fs.readFile('./data/inProg.json', 'utf8', function(err, data) {
                    if (err) throw err;
                    let test = JSON.parse(data);
                    test1 = {}
                    test1["working"] = true;
                    test1["username"] = u;
                    test1["role"] = role;
                    test1["groups"] = [];

                    console.log(extendedUserArray.length)

                    for (let a=0; a < extendedUserArray.length; a++) {
                        for (let i=0; i < extendedUserArray[a].userList.length; i++) {
                            //console.log(extendedUserArray[0].userList[i]);
        

                            // Check to see if username is in userlist
                            // userData will only be ok if it does match
                            // Add username + role so that they can be used later
                            if (extendedUserArray[a].userList[i] == u ) {
                                console.log(u);
                                console.log(extendedUserArray[a].userList[i]);
                                console.log(extendedUserArray[a].group);
                                userData["ok"] = true;
                                userData["username"] = u;
                                userData["role"] = role;
                                test1["ok"] = true;
                                console.log(test.groups);
                                roomList = extendedUserArray[a].rooms;
                                console.log(roomList);
                                //test["groups"].push(extendedUserArray[a].group);
                                test1.groups.push({group: extendedUserArray[a].group, rooms: roomList, userList: extendedUserArray[a].userList});
                                test2 = {roomList};

                            }
                        }
                    }



                    console.log(userData);
                    console.log(test);
                    console.log(test1);
                    userData = test;
                    res.send(test2);

                });
            });
            
        }
        
    });

}