var currentURL = window.location.origin;
var userName;
var password;
var user;
var signin = false;

$("#login").click(function(event) {
  event.preventDefault();
  userName = $("#userName")
    .val()
    .trim();
  password = $("#password")
    .val()
    .trim();
  user = {
    name: userName,
    password: password
  };
  try {
    $.get("/api/users", user).then(function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === user.name && data[i].password === user.password) {
            user = data[i];
            signin = true;
        }
      }
      if (signin){
        location.href = currentURL+ '/home/' + user.id;
      } else{
        alert("Invalid user name of password");
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
  userName = $("#userName")
    .val()
    .trim();
  password = $("#password")
    .val()
    .trim();
  user = {
    name: userName,
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
