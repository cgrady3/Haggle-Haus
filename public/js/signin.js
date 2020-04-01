var currentURL = window.location.origin;
var username;
var password;
var user;
var signin = false;

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
    $.get("/api/users", user).then(function(data) {
      console.log(data);
      console.log("username: " + user.username);
      console.log("password: " + user.password);
      console.log("user 1: " + data[0].username);
      console.log("user 1 password: " + data[0].password);
      for (var i = 0; i < data.length; i++) {
        if (data[i].username === user.username && data[i].password === user.password) {
            user = data[i];
            signin = true;
        }
      }
      if (signin){
        location.href = currentURL+ '/home/' + user.id;
      } else{
        alert("Invalid user name or password");
      }
    });
  } catch (err) {
    console.log(err);
    if (ValidationError) {
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
  user = {
    username: username,
    password: password
  };
  try {
    $.post("/api/users", user).then(function(data) {
      console.log(data);
      location.href = currentURL+ '/home/' + user.id;
    });
  } catch (err) {
    console.log(err);
    if (SequelizeUniqueConstraintError) {
      alert("username is taken");
    } else if (ValidationError) {
      alert("Invalid user name or password");
    }
  }
  $("#userName").val("");
  $("#password").val("");
});
