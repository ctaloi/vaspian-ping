const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const ping = require('ping');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('Client connected');

  let intervalId = null;

  socket.on('startPing', (ipAddress) => {
    clearInterval(intervalId);
    intervalId = setInterval(async () => {
      try {
        const result = await ping.promise.probe(ipAddress);
        socket.emit('pingData', result);
      } catch (error) {
        console.error('Error pinging:', error);
      }
    }, 1000);
  });

  socket.on('disconnect', () => {
    clearInterval(intervalId);
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
