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

app.get('/health', (req, res) => {
    const now = new Date();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log(`Health check requested from IP address: ${ip} at ${now}`);

    const healthData = {
        success: true,
        message: 'Application is running smoothly.',
        serverTime: now,
        serverUptime: `${process.uptime().toFixed()} seconds`
    };

    res.json(healthData);
});

server.listen(port, () => {
    console.log(`listening on http://app.cop.com:${port}`);
});
