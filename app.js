var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var colors = require('colors');
const PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected'.green);

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('contentcontroller', function (data) {
    console.log('')
    console.log(`Action: ${data.action}`.blue);
    console.log('Channel: contentcontroller'.green);
    console.log(`SubChannel: ${data.subchannel}`.green);
    console.log('data: ' + JSON.stringify(data));
    console.log('')
    io.emit('contentcontroller', data);
  });

});

http.listen(PORT, function () {
  console.log(`listening on *:${PORT}`);
});