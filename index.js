const app = require('express')();
const port = process.env.PORT ?? 6001;

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    transports: ['websocket'],
    secure: false,
});

io.on('connection', (socket) => {
    socket.on('appointment-updated', (data) => {
        socket.broadcast.emit('appointment-updated', data);
    });
});

server.listen(port, () => {
    console.log(`listening on http://app.cop.com:${port}`);
});
