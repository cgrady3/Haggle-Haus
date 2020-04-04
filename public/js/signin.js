var baseURL = "https://haggle-haus.herokuapp.com/";
var username;
var password;
var user;
var id;

$("#login").click(function(event) {
  event.preventDefault();
  username = $("#userName")
    .val()
    .trim();
  password = $("#password")
    .val()
    .trim();
  user = {
    username: username,
    password: password
  };
  try {
    $.post("/users/login", user).then(function(data) {
      console.log(data);

      console.log("username: " + user.username);
      console.log("password: " + user.password);
      console.log("user 1: " + data.username);
      console.log("user 1 password: " + data.password);
      id = data.password;

      location.href = baseURL + "home/" + id;
    });
  } catch (err) {
    console.log(err);
    if (err) {
      alert("Invalid user name or password");
    }
  }
  $("#userName").val("");
  $("#password").val("");
});

$("#newUser").click(function(event) {
  event.preventDefault();
  username = $("#userName")
    .val()
    .trim();
  password = $("#password")
    .val()
    .trim();
  console.log(username + "   " + password + "   " + password.length);
  user = {
    username: username,
    password: password
  };
  try {
    $.post("/api/users", user).then(function(data) {
      console.log(data);
      console.log(seshToken());
      id = data.password;
      location.href = baseURL + "home/" + id;
    });
  } catch (err) {
    console.log(err);
    alert(
      "username may be taken or the username and passwords entered is not 8-15 letters long"
    );
  }
  $("#userName").val("");
  $("#password").val("");
});
