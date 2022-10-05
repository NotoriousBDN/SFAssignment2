var fs = require('fs');

module.exports = function(req, res) {
    let groupInfo = {
        "group": req.body.groupname,
        "user": req.body.user,
    }
    console.log(groupInfo);
    a = groupInfo.group;
    b = groupInfo.user;
    userTaken = false;
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
                    for (let y=0; y < uArray[c].userList.length; y++) {
                        if (uArray[c].userList[y] == b) {
                            userTaken = true;
                            d = y;
                        }
                    }
                } 
            }  
            if (nametaken == false) {
                console.log("Group Name Does Not Exist")
            } else if (userTaken == false) {
                console.log("User already added");
            } else if (userTaken == true || nametaken == true) {
                uArray[c].userList.splice(d,1);
                console.log(uArray);
                let uArrayjson = JSON.stringify(uArray);
                    fs.writeFile('./data/groups.json', uArrayjson, 'utf-8', function(err) {
                        if (err) throw err;
                    });
                    res.send({
                        "userAdded" : true
                    });
                    
                }
        });
    }

}