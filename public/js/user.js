$(document).ready(function() {
  //For some reason replacing the $(".user-name") on line 9,11,13 with userName (from line 3)_ cause an error on the user page... therefore I guess there is no point in declaring that var... Idk why it doesn't work
  var userName = $(".user-name")
    .text()
    .trim();
  var userID = $(".user-id")
    .text()
    .trim();
  $(".user-name").hide();
  $(".user-id").hide();
  $(".user-name").text("");
  $(".user-id").text("");
  console.log($(".user-name").text());
  console.log($(".user-id").text());
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
        "<tr class = item-row data-toggle='modal' data-target='#bids-modal' data-id ='" +
          response[i].id +
          "'> <td> <img src =" +
          response[i].picture +
          " alt='' border=3 height=50 width=50 </img></td> <td id = 'item-name-" +
          response[i].id +
          "'>" +
          response[i].name +
          "</td> <td>" +
          response[i].bids.length +
          "</td > </tr > "
      );
      $("#user-offers").append(newRow);
    }
  });

  $(document).on("click", ".item-row", function(event) {
    event.preventDefault();
    var id = $(this).attr("data-id");

    //name
    var name = $(`#item-name-${id}`).text();
    $("#itemNameDiv").attr("class", "text-white");
    $("#itemNameDiv").text(name);

    api.grab("bids/item/" + id).then(function(response) {
      console.log(response);
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
            "</td> <td> <button class = 'btn accept-button bg-primary' data-id =" +
            response[i].id +
            "> Accept </button> </td> </tr>"
        );
        $("#current-item-bids").append(newRow);
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
      .trim();
    var parsedName = itemName.split(" ");
    var searchName = "";
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
});
