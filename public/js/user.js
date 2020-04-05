$(document).ready(function() {
  // Grabs user id from url
  var url = window.location.href;
  var parsedUrl = url.split("/");
  var user = parsedUrl[4];
  var current_user;

  // API object
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
    grabItem: function(path) {
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

  api.grab("items/user/" + current_user.id).then(function(response) {
    console.log(response);

    for (var i = 0; i < response.length; i++) {
      var newRow = $(
        "<tr> <td> <img src =" +
          response[i].picture +
          " alt='' border=3 height=50 width=50 </img></td> <td>" +
          response[i].name +
          "</td> <td>" +
          response[i].bids.length +
          "</td > </tr > "
      );
      $("#user-offers").append(newRow);
    }
  });

  api.grab("bids/user/" + current_user.id).then(function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      var newRow = $(
        "<tr> <td>" +
          response[i].item.amount +
          " " +
          response[i].item.name +
          "</td> <td>" +
          response[i].amount +
          " " +
          response[i].bid +
          "</td></tr>"
      );
      $("#user-bids").append(newRow);
    }
  });

  // Grabs form information to post to items API
  $("#add-item-listing").on("click", function(event) {
    event.preventDefault();

    var itemName = $("#item-name")
    .val()
    .trim()
    var parsedName = itemName.split(" ");
    var searchName = '';
    for (let i = 0; i < parsedName.length; i++) {
      searchName += parsedName[i];
    }

    var newItem = {
      name: $("#item-name")
        .val()
        .trim(),
      searchName: searchName,
      description: $("#item-description")
        .val()
        .trim(),
      base_barter: $("#barter-base")
        .val()
        .trim(),
      base_barter_amount: $("#barter-base-amount")
        .val()
        .trim(),
      amount: $("#item-desired-amount")
        .val()
        .trim(),
      userId: current_user.id
    };

    var image = $("#item-picture")
      .val()
      .trim();

    //   If picture field is not blank, add picture
    //   This ensures that the defaultValue will work if blank
    if (!(image === "")) {
      newItem.picture = image;
    }
    console.log(newItem);

    //   Submits the item
    api.submit("items", newItem).then(function(response) {
      console.log(response);
    });
  });
});
