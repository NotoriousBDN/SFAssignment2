var fs = require('fs');

module.exports = function(req, res) {
    let groupInfo = {
        "group": req.body.groupname,
        "room": req.body.roomname,
    }
    console.log(groupInfo);
    a = groupInfo.group;
    b = groupInfo.room;
    roomNameTaken = false;
    nametaken = false;
    if (a === "" || b === "") {
        console.log("Is Null");
        res.send({
            "emptyfield" : true
        });
    } else {
        fs.readFile('./data/groups.json', 'utf8', function(err, data) {
            if (err) throw err;
            uArray = JSON.parse(data);
            console.log(uArray);
            for (let i=0; i < uArray.length; i++) {
                if (uArray[i].group == a) {
                    nametaken = true;
                    console.log("Group Found")
                    c = i;
                    for (let y=0; y < uArray[c].rooms.length; y++) {
                        if (uArray[c].rooms[y] == b) {
                            roomNameTaken = true;
                            d = y;
                        }
                    }
                } 
            }  
            if (nametaken == false) {
                console.log("Group Name Does Not Exist")
            } else if (roomNameTaken == false) {
                console.log("Room Name Does Not Exist");
            } else if (roomNameTaken == true || nametaken == true) {
                    uArray[c].rooms.splice(d,1);
                    console.log(uArray);
                    let uArrayjson = JSON.stringify(uArray);
                    fs.writeFile('./data/groups.json', uArrayjson, 'utf-8', function(err) {
                        if (err) throw err;
                    });
                    res.send({
                        "roomAdded" : true
                    });
                    
                }
        });
    }

}