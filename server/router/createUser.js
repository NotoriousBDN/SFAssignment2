var fs = require('fs');

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
    if (userobj.id == null || userobj.username == "" || userobj.email == "" || userobj.role == null) {
        console.log("Invalid entry. Fill in all requirements");
        invalidentry = true;
    }
    fs.readFile('./data/newUsers.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(userobj.username);
        for (let i=0; i < uArray.length; i++) {
            if (uArray[i].username  == userobj.username) {
                console.log("Identical Name");
                nametaken = true;
            } else if (uArray[i].id == userobj.id) {
                console.log("Id Taken");
                idtaken = true;
            }
        }
        if (invalidentry == true) {
            res.send({
                "invalidentry": true
            });
        } 
        else if
        (userobj.role > 3 || userobj.role < 0) {
            roleinvalid = true;
            res.send({
                "roleinvalid": true
            });
        }
        else if (nametaken == true) {
            res.send({
                "nametaken": true
            });
        } 
        else if (idtaken == true) {
            res.send({
                "idtaken": true
            });
        }
        else {
            uArray.push(userobj);
            res.send(uArray);
        } 

        //else {
           // uArray[i] = userobj;
       // }
        // send response to user
        // res.send(uArray);
        // save the file of user list
        let uArrayjson = JSON.stringify(uArray);
        fs.writeFile('./data/newUsers.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });
}