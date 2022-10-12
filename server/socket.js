module.exports = {

    connect: function(io, PORT) {
        
        io.on('connection', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.id);


            //Will emit a message using roomname and username when a user joins a new room
            socket.on('joinRoom', (roomname, username) => {
                socket.join(roomname);
                join_room = username + ' has joined the room: ' + roomname;
                console.log(join_room);
                io.to(roomname).emit('join_room', join_room);
            });

            //Will emite message containing the username and their selected message
            //Will emit to only the specified room
            socket.on('message', (message, username, roomname) => {
                message = username + ": " + message;
                if (roomname == '') {
                    io.emit('message', message);
                } else {
                    io.to(roomname).emit('message', message);
                }
            });

            //Will emit a message when a user is disconnected from socket io
            socket.on('disconnect', () => {
                console.log("A user left the room");
                leftRoom = 'A user has left the room';
                io.emit('leftRoom', leftRoom);
            })
        });

    }
}