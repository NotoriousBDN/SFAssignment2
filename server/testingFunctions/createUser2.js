module.exports = function(req, res) {

    //Retrieves user info
    let userobj = {
        "id": req.body.userid,
        "username": req.body.username,
        "email": req.body.useremail,
        "role": req.body.userrole,
        "password": req.body.userpassword
    }
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    console.log("STARTING createUser2");
    console.log("#######################################################");
    console.log(userobj);
    let uArray = [];
    invalidentry=false;
    nametaken = false;
    idtaken = false;
    roleinvalid = false;
    //Checks if any are blank
    if (userobj.id == null || userobj.username == "" || userobj.email == "" || userobj.role == null || userobj.password == "") {
        console.log("Invalid entry. Fill in all requirements");
        invalidentry = true;
    }
    //Checks if the id is already in use
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        setTimeout(() => {
            dbo.collection("users").find({'id':userobj.id}).toArray(function(err, result) {
                //console.log(result);
                if (result.length != 0) {
                    console.log("ID ALREADY IN USE");
                    idtaken = true;
                } else if (result.length == 0) {
                    console.log("ID IS NOT IN USE");
                }
            });
        }, 500);   
        //Checks if the username is already in use
        setTimeout(() => {
            dbo.collection("users").find({'username':userobj.username}).toArray(function(err, result) {
                //console.log(result);
                if (result.length != 0) {
                    console.log("USERNAME ALREADY IN USE");
                    nametaken = true;
                } else if (result.length == 0) {
                    console.log("USERNAME IS NOT IN USE");
                }
            });
        }, 1000);
        //Validates
        setTimeout(() => {
            console.log("Name Taken", nametaken);
            console.log("ID Taken", idtaken);
            if (invalidentry == true) {
                res.send({
                    "invalidentry": true
                });
            } else if
            (userobj.role > 3 || userobj.role < 0) {
                roleinvalid = true;
                res.send({
                    "roleinvalid": true
                });
            } else if (nametaken == true) {
                res.send({
                    "nametaken": true
                });
            } else if (idtaken == true) {
                res.send({
                    "idtaken": true
                });
            } else {
                //Inserts user info into users collection
                dbo.collection("users").insertOne({'id':userobj.id, 'username':userobj.username, 'email':userobj.email, 'role':userobj.role, 'password':userobj.password}, function(err, res) {
                    if (err) throw err;
                    console.log("NEW USER ADDED");
                    db.close();
                });
            }
        },1500);

        /*
        setTimeout(checkId(), 500);
        setTimeout(checkName(), 100);
        setTimeout(check(), 1500);
        */
    });
}