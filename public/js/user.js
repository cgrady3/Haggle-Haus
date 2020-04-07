$(document).ready(function() {
  var userID = $(".user-id")
    .text()
    .trim();
  $(".user-name").hide();
  $(".user-id").hide();
  $("#bid-form").hide();
  console.log(userID);
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
    update: function(req) {
      return $.ajax({
        url: "/api/" + req,
        type: "PUT"
      });
    },
    annihilate: function(req) {
      return $.ajax({
        url: "/api/" + req,
        type: "DELETE"
      });
    }
  };

  api.grab("items/user/" + userID).then(function(response) {
    console.log(response);

    for (var i = 0; i < response.length; i++) {
      var newRow = $(
        "<tr class = item-row data-id ='" +
          response[i].id +
          "'> <td> <img src =" +
          response[i].picture +
          " alt='' border=3 height=50 width=50 </img></td> <td id = 'item-name-" +
          response[i].id +
          "'>" +
          response[i].name +
          "</td> <td id = 'see-bid-button-well-" +
          response[i].id +
          "'> <button class = 'btn see-bids-button login' data-toggle='modal' data-target='#bids-modal' data-api-id ='" +
          response[i].id +
          "' id = 'see-bids-button-" +
          response[i].id +
          "'> Browse " +
          response[i].bids.length +
          " bids </button>" +
          "</td> <td> <button class = 'btn delete-item-button bg-danger' data-api-id =" +
          response[i].id +
          "> Delete </button></td> </tr > "
      );
      $("#user-offers").append(newRow);
      if (response[i].bids.length === 0) {
        $("#see-bid-button-well-" + response[i].id).empty();
        $("#see-bid-button-well-" + response[i].id).text("No bids yet!");
      }

      if (response[i].bids.length === 1) {
        $("#see-bids-button-" + response[i].id).text("Browse 1 bid");
      }
    }
  });

  $(document).on("click", ".see-bids-button", function(event) {
    event.preventDefault();
    var id = $(this).attr("data-api-id");

    //name
    var name = $(`#item-name-${id}`).text();
    $("#itemNameDiv").attr("class", "text-white");
    $("#itemNameDiv").text(name);
    api.grab("bids/item/" + id).then(function(response) {
      console.log(response);
      $("#current-item-bids").empty();
      for (var i = 0; i < response.length; i++) {
        var newRow = $(
          "<tr class= 'bid-row' data-id ='" +
            response[i].id +
            "'> <td> <img id='bidImg" +
            response[i].id +
            "' src =" +
            response[i].picture +
            " alt='' border=3 height=50 width=50 </img></td> <td id='itemName" +
            response[i].id +
            "'>" +
            response[i].bid +
            "</td> <td id='bidAmount" +
            response[i].id +
            "'>" +
            response[i].amount +
            "</td> <td id='itemDesc" +
            response[i].id +
            "'>" +
            response[i].description +
            "</td> <td id='itemOwnedBy" +
            response[i].id +
            "'>" +
            response[i].user.username +
            "</td> <td> <button class = 'btn accept-button bg-primary login' data-id =" +
            response[i].id +
            " id = 'accept-button-" +
            response[i].id +
            "'> Accept </button> </td> </tr>"
        );
        $("#current-item-bids").append(newRow);
        if (response[i].accepted === true) {
          console.log("I got here");
          $("#accept-button-" + response[i].id).removeClass(
            "bg-primary accept-button"
          );
          $("#accept-button-" + response[i].id).addClass(
            "cancel-button bg-info"
          );
          $("#accept-button-" + response[i].id).text("Cancel");
        }
      }
    });
  });

  $(document).on("click", ".accept-button", function(event) {
    var id = $(this).attr("data-id");
    console.log(id);
    $(this).removeClass("accept-button bg-primary");
    $(this).addClass("cancel-button bg-info");
    $(this).text("Cancel");
    api.update("bids/accept/" + id).then(function(response) {
      console.log(response);
    });
  });

  $(document).on("click", ".cancel-button", function(event) {
    var id = $(this).attr("data-id");
    console.log(id);
    $(this).removeClass("cancel-button bg-info");
    $(this).addClass("accept-button bg-primary");
    $(this).text("Accept");
    api.update("bids/cancel/" + id).then(function(response) {
      console.log(response);
    });
  });

  api.grab("bids/user/" + userID).then(function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      var newRow = $(
        "<tr id = 'bid-row-" +
          response[i].id +
          "'> <td>" +
          response[i].item.amount +
          " " +
          response[i].item.name +
          "</td> <td>" +
          response[i].amount +
          " " +
          response[i].bid +
          "</td> <td> <p id = 'accept-status-" +
          response[i].id +
          "'>No </p> </td> <td> <button class = 'btn bg-danger delete-bid-button' data-api-id = '" +
          response[i].id +
          "' id = 'delete-bid-button-" +
          response[i].id +
          "'>Delete</button> </td> </tr>"
      );
      $("#user-bids").append(newRow);
      if (response[i].accepted === true) {
        $("#accept-status-" + response[i].id).text("Yes");
      }
    }
  });

  $(document).on("click", ".delete-bid-button", function(event) {
    event.preventDefault();
    var id = $(this).attr("data-api-id");
    api.annihilate("bids/" + id).then(function() {
      location.reload();
    });
  });

  $(document).on("click", ".delete-item-button", function(event) {
    event.preventDefault();
    var id = $(this).attr("data-api-id");
    api.annihilate("items/" + id).then(function() {
      location.reload();
    });
  });

  // Grabs form information to post to items API
  $("#add-item-listing").on("click", function(event) {
    event.preventDefault();

    var itemName = $("#item-name")
      .val()
      .trim();
    var parsedName = itemName.split(" ");
    var searchedName = "";
    for (let i = 0; i < parsedName.length; i++) {
      searchedName += parsedName[i];
    }
    var searchName = searchedName.toLowerCase();

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
      userId: userID
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
    api.submit(newItem, "items").then(function(response) {
      console.log(response);
    });
    //this updates the page to clear the form and also show the item we just added
    location.reload();
  });
  $("#open-form").click(function(e) {
    e.preventDefault();
    $("#bid-form").show();
    $("#open-form").hide();
  });
  $("#close-form").click(function(e) {
    e.preventDefault();
    $("#bid-form").hide();
    $("#open-form").show();
  });
});
