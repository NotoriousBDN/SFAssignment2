const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const cors = require('cors');
const http = require('http').Server(app);

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});

const sockets = require('./socket.js');
const server = require('./listen.js');

const PORT = 3000;

app.use(cors());

sockets.connect(io, PORT);

server.listen(http, PORT);


const auth2 = require('./router/auth2');



const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
//MongoClient.connect(url, {poolSize:0}, function(err, client) {
MongoClient.connect(url, function(err, client) {
    if (err) {return console.log(err)}
    const dbName = 'users';
    const db = client.db(dbName);
    console.log("MONGO WORKING");
    //All routes being called
    app.post('/getUser2', require('./router/getUser2'));
    app.post('/getGroup2', require('./router/getGroup2'));
    app.post('/createUser2', require('./router/createUser2'));
    app.post('/deleteUser2', require('./router/deleteUser2'));
    app.post('/editUser2', require('./router/editUser2'));
    app.post('/createGroup2', require('./router/createGroup2'));
    app.post('/createRoom2', require('./router/createRoom2'));
    app.post('/addUserGroup2', require('./router/addUserGroup2'));
    app.post('/deleteGroup2', require('./router/deleteGroup2'));
    app.post('/deleteRoom2', require('./router/deleteRoom2'));
    app.post('/removeUserGroup2', require('./router/removeUserGroup2'));


})
