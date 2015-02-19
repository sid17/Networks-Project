var express = require('express')
var app = express()
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
    socket.on('adduser', function(username,roomname){
      console.log("Added :"+username+"to:"+roomname);
    socket.username = username;
    socket.room = roomname;
    socket.join(roomname);
  });

  socket.on('video_chat', function(msg){
    //console.log("bypassing stream");
    socket.in(socket.room).broadcast.emit('video_chat', msg);
  });

  socket.on('audio_chat', function(msg){
    //console.log("bypassing stream");
    socket.in(socket.room).broadcast.emit('audio_chat', msg);
  });

 socket.on('text_chat', function(msg){
    //socket.broadcast.emit('text_chat', msg);
    //io.sockets.in(socket.room).emit('text_chat', socket.username, msg);
    socket.in(socket.room).broadcast.emit('text_chat', socket.username, msg);
  });
});

http.listen(4242, function(){
  console.log('listening on *:4242');
});

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  	res.render('demo.html.ejs');
});
app.post('/', function (req, res) {
  res.send('Got a POST request');
})
// accept PUT request at /user
app.get('/user', function (req, res) {
  res.send('Got a get request at /user');
})
// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})
