$(document).ready(function() {
  var baseURL = window.location.href.split("aboutTheHaus/")[0];
  var user = window.location.href.split("aboutTheHaus/")[1];
  $("#home").click(function(event) {
    event.preventDefault();
    location.href = baseURL + "home/" + user;
  });

  $("#userProfile").click(function(event) {
    event.preventDefault();
    location.href = baseURL + "user/" + user;
  });

  $("#about").click(function(event) {
    event.preventDefault();
    location.reload();
  });
});
