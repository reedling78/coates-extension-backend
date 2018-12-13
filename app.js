const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const colors = require('colors');
const mongoose = require('mongoose');

const Switchboard = require('./models/switchboard')

const PORT = process.env.PORT || 3000




mongoose
  .connect(
    'mongodb://mongo:27017/coates-extension',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));






app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/switchboards', (req, res) => {
  Switchboard.find()
    .then(switchboards => res.status(200).json({ 
      switchboards 
    }))
    .catch(err => res.status(404).json({ 
      msg: 'No switchboards found' 
    }))
});






io.on('connection', function (socket) {
  console.log('a user connected'.green);

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

  socket.on('extension', function (data) {
    console.log('')
    console.log(colors.green(`Action: ${data.action}`.blue));
    console.log('Channel: extension');
    console.log('Data: ' + JSON.stringify(data));

    data.payload.switchboards.forEach(host => {

      Switchboard.find({ host: host })
        .then(switchboards => {
          if (switchboards.length === 0) {
            const newSwitchboard = new Switchboard({
              host: host
            });
      
            newSwitchboard.save().then(switchboard => {
              console.log('Added: ', switchboard)
            });
          } else {
            console.log('skip it', host)
          }
        })
    });

    io.emit('extension', data);
  })

});

http.listen(PORT, function () {
  console.log(`listening on *:${PORT}`);
});