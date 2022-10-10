module.exports = {

    connect: function(io, PORT) {
        
        io.on('connection', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.id);

            socket.on("test-event", (a) => {
                console.log(a);
            });

            socket.on('message', (message, username) => {
                message = username + ": " + message;
                io.emit('message', message);
            });
        });

        io.on('connect', () => {
            console.log("User has connected");
        
        });




        io.on('user_joins', (data) => {
            console.log("new user");
        });

    }
}