$(document).ready(function() {


  socket = io("http://localhost:9000");
  console.log('test');
  socket.emit('send_request', JSON.stringify(), function(data){
      console.log('test ', data + ' (wysłano na serwer)');

    var a = 0;
    var port = "80";
    var timeStamp = Math.floor(Math.random() * 5000);


    $('area').click(function(e) {
        e.preventDefault();
    });

    $.getJSON('http://localhost:'+port+'/users.json?time='+timeStamp, {
        format: "json",
        async: "false"
      }).done(function(dataUsers) {
        a+=1;
        user1_units_to_deploy = dataUsers["users"]["user1"]["units_to_deploy"];
        userName = dataUsers["users"]["user1"]["userName"];
        $('#unit_text').replaceWith("<p id=\"unit_text\"> Posiadasz " + user1_units_to_deploy + " jednostek do rozmieszczenia </p>");
        $('#turn_text').replaceWith("<h1 id=\"turn_text\"> " + userName  + " turn </h1>");
        return console.log("Pobrano users.json");
    });

    $.getJSON('http://localhost:'+port+'/countries.json', {
        format: "json"

    }).done(function(dataCountries) {
        alaska_units = dataCountries["continents"]["North_america"]["countries"]["Alaska"]["units"]; //Bez var, żeby zmienna w funckji stała się globalna
        northWest_units = dataCountries["continents"]["North_america"]["countries"]["North_west"]["units"];
        alaska_owner = dataCountries["continents"]["North_america"]["countries"]["Alaska"]["owner"];
        return console.log("Pobrano countries.json");
    });




}); // Koniec funkcji ready
