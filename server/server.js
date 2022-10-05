/*
const express = require('express'),
app = express();

fs = require('fs'),
    http = require('http'),
    PORT = 3001,
    PORT2 = 8888;


// Cross origin resource sharing to cater for port 4200 to port 3000

const cors = require('cors');

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const httpServer = http.Server(app);


const https = require('https'),
    options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')

    },
    httpsServer = https.createServer(options, app);




httpServer.listen(PORT2, function() {
    console.log(`http Server listening on port: ${PORT2}`);
});

httpsServer.listen(PORT, () => {
    console.log(`Starting htttps server at: ${PORT}`);
});

app.post('/login', require('./router/postLogin'));
app.post('/loginafter', require('./router/postLoginAfter'));
*/


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

app.post('/getUser', require('./router/getUser'));
app.post('/getGroup', require('./router/getGroup'));
app.post('/getRooms', require('./router/getRooms'));
app.post('/getUsers', require('./router/getUsers'));
app.post('/createUser', require('./router/createUser'));
app.post('/editUser', require('./router/editUser'));
app.post('/deleteUser', require('./router/deleteUser'));
app.post('/createGroup', require('./router/createGroup'));
app.post('/createRoom', require('./router/createRoom'));
app.post('/addUserGroup', require('./router/addUserGroup'));
app.post('/deleteGroup', require('./router/deleteGroup'));
app.post('/deleteRoom', require('./router/deleteRoom'));
app.post('/removeUserGroup', require('./router/removeUserGroup'));