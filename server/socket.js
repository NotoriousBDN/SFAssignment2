module.exports = {

    connect: function(io, PORT) {
        
        io.on('connection', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.id);


            socket.on('joinRoom', (roomname, username, cb) => {
                socket.join(roomname);
                join_room = username + ' has joined the room: ' + roomname;
                console.log(join_room);
                cb('A user has joined ', roomname);
                io.emit('join_room', join_room);
            });

            socket.on('message', (message, username, roomname) => {
                message = username + ": " + message;
                if (roomname == '') {
                    io.emit('message', message);
                } else {
                    io.to(roomname).emit('message', message);
                }
              
            });
        });

    }
}