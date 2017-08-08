var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server,{});
var fs = require('fs');
var port = 8080;

var username = 'ignacy';
var password = '12345';

var passwordHash = require('password-hash');
var hashedPassword = passwordHash.generate(password);

console.log(hashedPassword);
//app.use(express.static(__dirname)); // Current directory is root
app.use('/', express.static(__dirname + '/public_html')); //  "public" off of current is root
server.listen(port);
console.log("working on port " + port);

function databaseConnect() {
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'minecraftweb.pl',
   user     : 'ignacy_grauser',
   password : 'hDG2%[wuhp,}',
   database : 'ignacy_ryzyko'
 });
 connection.connect(function(err) {
   if (err) {
     console.error('error connecting: ' + err.stack);
     return;
   }

  console.log('connected as id ' + connection.threadId);
 });
 return connection;
}

function checkData(data, callback){
  connection = databaseConnect();
  var sql = 'SELECT ID FROM Users ';
  var ret = true;
  sql += 'WHERE nick = ' + connection.escape(data.username);
  sql += ' AND password = ' + connection.escape(data.password);
     connection.query(sql,
       function (error, results, fields) {
         if (error) {
           callback(false);
         }
       if (results.length > 0){
         console.log('The solution is: ', results[0].ID);
           callback(true)
       } else {
         callback(false)
       }
    });
    connection.end();
}

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

SOCKETS_LIST = {};
io.on('connection', function (socket) {
  socket.id = Math.random();
  SOCKETS_LIST[socket.id] = socket;
  console.log("client connected");
    socket.on('hello', function (data) {
      console.log("hello " + data);
      socket.emit("server_msg", {
        msg : "server_hello",
      });
  });
  socket.on('login', function(data){
    console.log("login request");
    checkData(data, function(isValid){
      if (isValid){
        socket.emit("login_response", data.username);
      } else{
        socket.emit("login_response", "Authentication Failed");
      }
    });
  });
});

setInterval(function(){
  for (var i in SOCKETS_LIST ){
    socket = SOCKETS_LIST[i];
    socket.emit("server_msg", {
      msg : "server_hello",
    });
  }},1000);
