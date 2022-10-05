var fs = require('fs');

module.exports = function(req, res) {
    y = req.body.groupName; 
    console.log(y);
    u = "Secret Chat";
    console.log(u);
    check = false;
    fs.readFile('./data/groups.json', 'utf8', function(err, data) {
        if (err) throw err;
        let userArray = JSON.parse(data);
        console.log(userArray);
        console.log(userArray[0].group)
        console.log(userArray[0].rooms)
        console.log(userArray[0].userList);
        for (let i=0; i < userArray.length; i++) {
           if (y == userArray[i].group) {
            console.log("Match");
            userList = userArray[i].userList;
            check = true;
           }
        }
        if (check == true) {
            console.log("THIS SHOULD WORK");
            res.send(userList);
        } else {
            res.send({"ok": false});
        }
    });

}