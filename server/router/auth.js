module.exports = function(app,db) {
    
    app.post('/api/auth', (req, res) => {

        console.log("auth running");

        const assert = require('assert');
        
        var uname = req.body.username;
        console.log('uname');
        var pwd = req.body.password;
        const collection = db.collection('users');

        collection.find({'username':uname, 'password':pwd}).count(function (err, count) {
            assert.equal(null, err);

            if (count > 0) {
                res.send({'username': uname, 'success': true});
            } else {
                res.send({'username': '', 'success': false});
            }
        });
    });
}