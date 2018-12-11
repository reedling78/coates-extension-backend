const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const colors = require('colors');
const PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connectedddddddd'.green);

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('contentcontroller', function (data) {
    console.log('')
    console.log(colors.green(`Action: ${data.action}`.blue));
    console.log('Channel: contentcontroller');
    console.log(`SubChannel: ${data.subchannel}`.green);
    console.log('Data: ' + JSON.stringify(data));
    io.emit('contentcontroller', data);
  });

  console.log('happened!!!!!!!!!!!!!!!!!!!')

  socket.on('extension', function (data) {
    console.log('')
    console.log(colors.green(`Action: ${data.action}`.blue));
    console.log('Channel: extension');
    console.log('Data: ' + JSON.stringify(data));
    io.emit('extension', data);
  }


  

});



http.listen(PORT, function () {
  console.log(`listeninggggg on *:${PORT}`);
});