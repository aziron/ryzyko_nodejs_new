socket = io();

function updateValues() {
  socket.emit("hello", "world");
}

socket.on('server_msg', function(data){
  console.log(data.msg);
});

socket.on('login_response', function(data){
  console.log("login response: " + data);
});
var canvas = document.getElementById('game-map');
var context = canvas.getContext('2d');

context.moveTo(294, 164.5 - 74.5);
context.bezierCurveTo(294 + (0.5522847498307936 * 79), 164.5 - 74.5,  294 + 79, 164.5 - (0.5522847498307936 * 74.5), 294 + 79, 164.5);
context.bezierCurveTo(294 + 79, 164.5 + (0.5522847498307936 * 74.5), 294 + (0.5522847498307936 * 79), 164.5 + 74.5, 294, 164.5 + 74.5);
context.bezierCurveTo(294 - (0.5522847498307936 * 79), 164.5 + 74.5, 294 - 79, 164.5 + (0.5522847498307936 * 74.5), 294 - 79, 164.5);
context.bezierCurveTo(294 - 79, 164.5 - (0.5522847498307936 * 74.5), 294 - (0.5522847498307936 * 79), 164.5 - 74.5, 294, 164.5 - 74.5);
context.fillStyle = 'rgba(255, 0, 0, 0.5)';
context.fill();
context.stroke();
