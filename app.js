const app = require('./config/server');

const server = app.listen(5000, () => {
    console.log("Server is running with Express in PORT 5000...")
});

const io = require('socket.io')(server);

app.set("io", io);

io.on('connection', (socket) => {

    socket.on('disconnect', () => {

    });

    socket.on('sendMessage', (data) => {

        socket.emit("message", { apelido: data.apelido, message: data.message });

        socket.broadcast.emit("message", { apelido: data.apelido, message: data.message });

        if(parseInt(data.apelido_cliente) == 0) {
            socket.emit("participants", { apelido: data.apelido });

            socket.broadcast.emit("participants", { apelido: data.apelido });
        }
    });
});