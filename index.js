var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('name', function(data){
  io.sockets.emit('broadcast', { description: data.description });
   socket.on('disconnect', function (msg) {
             io.emit('disconnected',  {name: data.description});
             });
    });


  socket.on('chat message name', function(msg){
    io.emit('chat message name',  msg);
  });

  });

// socket.on('disconnect', function (data) {
	//          io.emit('disconnected',  {});
    //        });
  // });

http.listen(3000, function(){
  console.log('listening on *:3000');
});
