var baseURL = 'https://haggle-haus.herokuapp.com/';
var url = window.location.search;
var urlParams = new URLSearchParams(url);
var id = urlParams.get(id);
var item = urlParams.get(item);

$(document).ready(function() {
  // The API object contains methods for each kind of request we'll make
  var api = {
    submit: function(res, path) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/" + path,
        data: JSON.stringify(res)
      });
    },
    grab: function(path) {
      return $.ajax({
        url: "/api/" + path,
        type: "GET"
      });
    },
    annihilate: function(path) {
      return $.ajax({
        url: "/api/" + path,
        type: "DELETE"
      });
    }
  };

  api.grab(id+ "/" + item).then(function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      var newRow = $(
        "<tr> <td> <img src =" +
          response[i].picture +
          " alt='' border=3 height=50 width=50 </img></td> <td>" +
          response[i].name +
          "</td> <td>" +
          response[i].description +
          "</td> <td>" +
          response[i].base_barter_amount +
          " " +
          response[i].base_barter +
          "</td> <td> <button class = 'bid-button'> Add Bid </button> </td> </tr>"
      );
      $("#current-offers").append(newRow);
    }
  });
});

$("#clearSearch").click(function(event) {
  event.preventDefault();
  location.href = baseURL + '/home/' + id;
});

$("#home").click(function(event) {
  event.preventDefault();
  location.href = baseURL + "home/" + id;
});

$("#userProfile").click(function(event) {
  event.preventDefault();
  location.href = currentURL;
});

$("#about").click(function(event) {
  event.preventDefault();
  location.href = baseURL + "aboutTheHaus";
});
