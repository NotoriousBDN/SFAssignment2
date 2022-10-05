var fs = require('fs');

module.exports = function(req, res) {
    var u = req.body.username;
    console.log("#################################################################");
    console.log("Begining GetGroup.js");
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
            fs.readFile('./data/groups.json', 'utf8', function(err, data) {
                if (err) throw err;
                let extendedUserArray = JSON.parse(data);
                console.log(extendedUserArray);
                console.log(extendedUserArray[0].userList);
                test2 = [];
                console.log(extendedUserArray.length)
                for (let a=0; a < extendedUserArray.length; a++) {
                    for (let i=0; i < extendedUserArray[a].userList.length; i++) {
                        if (extendedUserArray[a].userList[i] == u ) {
                            roomList = extendedUserArray[a].rooms;
                            console.log(roomList);
                            test2.push({group: extendedUserArray[a].group, rooms: roomList});
                        }
                    }
                }
                console.log(test2);
                res.send(test2);
            });
        }
    });
}
