module.exports = function(req, res) {

    //Retrieves user info
    let userobj = {
        "id": req.body.userid,
        "username": req.body.username,
        "email": req.body.useremail,
        "role": req.body.userrole,
        "password": req.body.userpassword
    }
    console.log("DELETE USER RUNNING");
    console.log("#####################################################################");
    console.log(userobj);
    //let uArray = [];
    invalidentry=false;
    nametaken = false;
    idtaken = false;
    roleinvalid = false;
    namematch = false;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    //Validation for blanks
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        var myquery = { id: userobj.id };
        if (userobj.username == "" && userobj.role == "" && userobj.email == "") {
            console.log("NO VALUES WERE FILL");
            var newvalues = { $set: {} };
        } else if (userobj.username == "" && userobj.role == "") {
            console.log("ONLY EMAIL CAN BE UPDATED");
            var newvalues = { $set: { email: userobj.email } };
        } else if (userobj.username == "" && userobj.email == "") {
            console.log("ONLY ROLE CAN BE CHANGED");
            var newvalues = { $set: { role: userobj.role } };
        } else if (userobj.role == "" && userobj.email == "") {
            console.log("ONLY USERNAME CAN BE UPDATED");
            var newvalues = { $set: { username: userobj.username } };
        } else if (userobj.username == "") {
            console.log("NO USERNAME PROVIDED");
            var newvalues = { $set: { email: userobj.email, role: userobj.role } };
        } else if (userobj.role == "") {
            console.log("NO ROLE PROVIDED");
            var newvalues = { $set: { username: userobj.username, email: userobj.email } };
        } else if (userobj.email == "") {
            console.log("NO EMAIL PROVIDED");
            var newvalues = { $set: { username: userobj.username, role: userobj.role } };
        } else {
            console.log("ALL VALUES WERE FILLED");
            var newvalues = { $set: { username: userobj.username, email: userobj.email, role: userobj.role } };
        }
        //Updates users collection with new user info
        setTimeout(() => {
            dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("EDITED USER");
                db.close();
            });
        }, 500);
    });
    




}