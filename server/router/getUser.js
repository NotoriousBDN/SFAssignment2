var fs = require('fs');

module.exports = function(req, res) {
    var u = req.body.username;
    var p = req.body.password;
    console.log("#################################################################");
    console.log("Starting GetUser.js");
    console.log(u);
    console.log(p);
    check = false;
    fs.readFile('./data/newUsers.json', 'utf8', function(err, data) {
        // the above path is with respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data);
        console.log(userArray);
        a = "DOES NOT WORK";
        let i = userArray.findIndex(user =>
            (user.username == u));
        check = false;


        for (let i=0; i < userArray.length; i++) {
            if (u == userArray[i].username && p == userArray[i].password) {
                console.log("Match");
                console.log(u, userArray[i].username);
                console.log(p, userArray[i].password);
                userInfo = userArray[i];
                check = true;
            }
        }
        if (check == false) {
            console.log("NO MATCH");
            res.send({"ok": false});
        } else if (check == true) {
            userInfo = userArray[i];
            userInfo["ok"] = true;
            res.send(userInfo);   
        } 
    });   
}