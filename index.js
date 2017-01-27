var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var allClients = [];

io.on('connection', function(socket){

   allClients.push(socket.id);


  socket.on('name', function(data){
  allClients.push(data.description);
  console.log(allClients);
  io.sockets.emit('broadcast', { description: data.description, list: allClients });

    });

  socket.on('chat message name', function(msg){
    io.emit('chat message name',  msg);
  });

  socket.on('disconnect', function(data){
     var i = allClients.indexOf(socket.id);
     io.sockets.emit('discon', {description: allClients[i + 1]} );
     console.log(allClients[i + 1] + " " + "is disconnected!");
     allClients.splice(i, 2);
     console.log(allClients);
  });

  });


http.listen(3000, function(){
  console.log('listening on *:3000');
});
