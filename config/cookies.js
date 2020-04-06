function readCookie(current_user) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

// Capture Button Click
$("#login").on("click", function (event) {
  event.preventDefault();
  var name = $("#userName").val().trim();
  console.log(name);
  document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "name=" + name;
  console.log('doc cookie: ' + document.cookie);
  var cookieName = readCookie("name");
  console.log('cookie name: '+ cookieName);
});

$("#login").on("click", function (event) {
  event.preventDefault();
  var name = $("#userName").val().trim();
  console.log(name);
  document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "name=" + name;
  console.log('doc cookie: ' + document.cookie);
  var cookieName = readCookie("name");
  console.log('cookie name: '+ cookieName);
});

$("#cookie").text(readCookie("name"));
