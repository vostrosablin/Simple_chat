var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var clients = 0;

io.on('connection', function(socket){
  clients++;
  io.sockets.emit('broadcast',{ description: clients + ' client(s) connected!'});
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function () {
	       clients--;
	         io.sockets.emit('broadcast',{ description: clients + ' client(s) connected!'});
             });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
