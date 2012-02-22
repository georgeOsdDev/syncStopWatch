
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

var myhost = process.env.VCAP_APP_HOST || '10.34.8.132';
var myport = process.env.VCAP_APP_PORT || '3000';

app.listen(process.env.VCAP_APP_PORT || 3000);
console.log("Express server listening on port %d in %s", app.address().port, app.settings.env);
console.log("url -> http://" + myhost + ':' + myport + '/' );
var activeUser = 0;
var socketIO = require('socket.io');

var io = socketIO.listen(app);
console.log(io.toString());
io.sockets.on('connection', function(socket){
  console.log("connection");
  activeUser++;
  io.sockets.emit('logMsg',{value: socket.id + ' is connected'});
  io.sockets.emit('nowActiveUser',{value: activeUser});

  socket.on('message', function(data){
    console.log("message");
    socket.emit('message',{value: data.value});
  });

  socket.on('disconnect', function(i){
    console.log("disconnect");
    socket.emit('disconect',{value: 'LogOut'});
    activeUser--;
    io.sockets.emit('logMsg',{value: socket.id + ' is disconnected'});
    io.sockets.emit('nowActiveUser',{value: activeUser});
  });

  socket.on('myfunc',function(data){
    console.log('myfunc ok :[ ' + data.value + ' ]');
    io.sockets.emit('yourfunc',{value: data.value});
     console.log('broadcast dane!');
  });
});

