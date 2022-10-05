var fs = require('fs');
const { exit } = require('process');

module.exports = function(req, res) {
    let u = {"username": req.body.username};
    let y = u.username;
    console.log(y);
    nametaken = false;

    let uArray = [];
    fs.readFile('./data/newUsers.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(uArray);
        for (let i=0; i < uArray.length; i++) {
            if (uArray[i].username  == y) {
                console.log("Identical Name");
                nametaken = true;
                z = i;
            } 
        }
        if (nametaken == false) {
            console.log("False");
            res.send({
                "nametaken": false
            });
        } else if (nametaken == true) {
            console.log("True");
            console.log(z);
            //Delete from current array not js array
            //delete uArray[z];
            uArray.splice(z, 1);
            console.log(uArray);
            let uArrayjson = JSON.stringify(uArray);
            fs.writeFile('./data/newUsers.json', uArrayjson, 'utf-8', function(err) {
                if (err) throw err;
            });
            res.send({
                "nametaken": true
            });
        }
    });
}