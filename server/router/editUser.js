var fs = require('fs');
const { exit } = require('process');

module.exports = function(req, res) {
    let userobj = {
        "id": req.body.userid,
        "username": req.body.username,
        "email": req.body.useremail,
        "role": req.body.userrole
    }
    console.log(userobj);
    let uArray = [];
    invalidentry=false;
    nametaken = false;
    idtaken = false;
    roleinvalid = false;
    namematch = false;

    fs.readFile('./data/newUsers.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(userobj.username);
        for (let i=0; i < uArray.length; i++) {
            if (uArray[i].username  == userobj.username) {
                console.log("User Recognised");
                namematch = true;
                if (userobj.email == "") {
                    userobj.email = uArray[i].email;
                }
                if (userobj.role > 3 || userobj.role < 0) {
                    roleinvalid = true;
                    res.send({
                        "roleinvalid": true
                    });
                } else if (userobj.role == null) {
                    userobj.role = uArray[i].role;
                }
                userobj.id = uArray[i].id; 
                uArray[i] = userobj;
            }
        }
        if (namematch = false) {
            res.send({
                "namematch": true
            });
        } else {
            let uArrayjson = JSON.stringify(uArray);
            fs.writeFile('./data/newUsers.json', uArrayjson, 'utf-8', function(err) {
                if (err) throw err;
            });
        }
    });
}