$('#login_form').submit(function( event ) {
  console.log("login request");
  login();
  event.preventDefault();
});

function login() {
  var username = $('#username').val();
  socket.emit("login", {
    "username": username,
    "password": "12345",
  });
}
