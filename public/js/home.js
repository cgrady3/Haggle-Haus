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

  api.grab("items").then(function(response) {
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

$("#search").click(function(event) {
  event.preventDefault();
  var item = $("#search")
    .val()
    .trim();
  search = {
    item: item
  };

  $.get(`/api/items/${search.item}`).then(function(data) {
    console.log(data.name);
    location.href = `currentURL${/home/item/data.name}`;
  });
});
