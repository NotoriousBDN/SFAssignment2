var fs = require('fs');

module.exports = function(req, res) {
    console.log("check");
    let u = {"groupname": req.body.groupname};
    console.log(u);
    let y = u.groupname;
    console.log(y);
    nametaken = false;
    invalidname = false;
    if (u == {"groupname": ""}) {
        invalidname = true;
        console.log("Empty");
        res.send({
            "invalidname": true
        });
    } else {
        fs.readFile('./data/groups.json', 'utf8', function(err, data) {
            if (err) throw err;
            uArray = JSON.parse(data);
            console.log(uArray);
            for (let i=0; i < uArray.length; i++) {
                if (uArray[i].group == y) {
                    nametaken = true;
                    console.log("Same Name");
                    z = i;
                }
            }
            if (nametaken == true) {
                uArray.splice(z, 1);
                console.log(uArray);
                let uArrayjson = JSON.stringify(uArray);
                fs.writeFile('./data/groups.json', uArrayjson, 'utf-8', function(err) {
                    if (err) throw err;
                });
            }
        });
    }
}