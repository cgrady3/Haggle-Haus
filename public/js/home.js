$(document).ready(function() {
  //Grabbing user ID
  var userID = $(".user-id")
    .text()
    .trim();
  $(".user-name").hide();
  $(".user-id").hide();

  //Object for interacting with the api
  var api = {
    submit: function(res, req) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/" + req,
        data: JSON.stringify(res)
      });
    },
    grab: function(req) {
      return $.ajax({
        url: "/api/" + req,
        type: "GET"
      });
    },
    annihilate: function(req) {
      return $.ajax({
        url: "/api/" + req,
        type: "DELETE"
      });
    }
  };

  //Populates items up for bid
  api.grab("items").then(function(response) {
    for (var i = 0; i < response.length; i++) {
      var newRow = $(
        "<tr class= 'itemRow' data-api-id ='" +
          response[i].id +
          "' data-number='" +
          i +
          "' data-toggle='modal' data-target='#info-modal'> <td> <img id='itemImg" +
          i +
          "' src =" +
          response[i].picture +
          " alt='' border=3 height=50 width=50 </img></td> <td id='itemName" +
          i +
          "'>" +
          response[i].name +
          "</td> <td id='itemDesc" +
          i +
          "'>" +
          response[i].description +
          "</td> <td id='itemBaseBarter" +
          i +
          "'>" +
          response[i].base_barter_amount +
          " " +
          response[i].base_barter +
          "</td> <td id='itemUser" +
          i +
          "'>" +
          response[i].user.username +
          "</td> <td>" +
          response[i].bids.length +
          " </td> </tr>"
      );
      $("#current-offers").append(newRow);
    }
  });

  //on table row click, append info to modal
  $(document).on("click", ".itemRow", function(event) {
    event.preventDefault();
    var id = $(this).attr("data-number");
    var apiId = $(this).attr("data-api-id");
    //img
    var img = $(`#itemImg${id}`).attr("src");
    $(".modal-body img").attr("src", img);

    //name
    var name = $(`#itemName${id}`).text();
    $("#itemNameDiv").text(name);
    $("#itemNameDiv").attr("class", "text-white");
    $("#itemNameDiv").attr("data-api-id", apiId);

    //desc
    var desc = $(`#itemDesc${id}`).text();
    $("#itemDescDiv").text(desc);

    //owner
    var owner = $(`#itemUser${id}`).text();
    $("#itemUserDiv").text(owner);
    //email could be added if the users email is returned in the user response
  });

  //Submits a bid when the form is filled out and the button clicked.
  $(document).on("click", ".bid-button", function(event) {
    event.preventDefault();
    $("#error-warning").empty();
    var errorArray = [];
    var newBid = {
      bid: $("#bid-name")
        .val()
        .trim(),
      amount: $("#bid-amount")
        .val()
        .trim(),
      description: $("#bid-description")
        .val()
        .trim(),
      itemId: $("#itemNameDiv").attr("data-api-id"),
      userId: userID
    };

    var image = $("#bid-picture")
      .val()
      .trim();

    //   If picture field is not blank, add picture
    //   This ensures that the defaultValue will work if blank
    if (!(image === "")) {
      newBid.picture = image;
    }

    if (newBid.description.length < 20 || newBid.description.length > 140) {
      errorArray.push("The description must be between 20 and 140 characters.");
    }

    if (newBid.amount < 1 || newBid.amount > 20) {
      errorArray.push("The amount must be between 1 and 20.");
    }

    if (newBid.bid === "") {
      errorArray.push("The name cannot be blank.");
    }

    if (errorArray.length === 0) {
      api.submit(newBid, "bids").then(function() {
        location.reload();
      });
    } else {
      for (let i = 0; i < errorArray.length; i++) {
        var newError = $("<p>" + errorArray[i] + "</p>");
        $("#error-warning").append(newError);
      }
    }
  });

  $(document).on("click", "#close-button", function(event) {
    event.preventDefault();
    $("#error-warning").empty();
  });

  $("#search").click(function(e) {
    e.preventDefault();

    var item = $("#itemSearch")
      .val()
      .trim();

    var parsedItem = item.split(" ");
    var searchedItem = parsedItem.join("");
    var searchItem = searchedItem.toLowerCase();

    location.href = "search/" + searchItem;
  });

  $("#itemSearch").on("keydown", function(e) {
    if (e.keyCode === 13) {
      var item = $("#itemSearch")
        .val()
        .trim();

      var parsedItem = item.split(" ");
      var searchedItem = parsedItem.join("");
      var searchItem = searchedItem.toLowerCase();

      location.href = "search/" + searchItem;
    }
  });
});
