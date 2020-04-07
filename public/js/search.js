$(document).ready(function() {
  var userID = $(".user-id").text();
  $(".user-name").hide();
  $(".user-id").hide();
  console.log(userID);
  var url = window.location.href;
  var parsedUrl = url.split("/");
  var item = parsedUrl[4];
  console.log(item);

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

  function search(item) {
    api.grab("searchItems/" + item).then(function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var newRow = $(
          "<tr class= 'itemRow' data-number='" +
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
            "</td> </tr>"
        );
        $("#current-offers").append(newRow);
      }
    });
  }

  //on table row click, append info to modal
  $(document).on("click", ".itemRow", function(event) {
    event.preventDefault();
    var id = $(this).attr("data-number");
    //img
    var img = $(`#itemImg${id}`).attr("src");
    $(".modal-body img").attr("src", img);

    //name
    var name = $(`#itemName${id}`).text();
    $("#itemNameDiv").text(name);
    $("#itemNameDiv").attr("class", "text-white");

    //desc
    var desc = $(`#itemDesc${id}`).text();
    $("#itemDescDiv").text(desc);

    //owner
    var owner = $(`#itemUser${id}`).text();
    $("#itemUserDiv").text(owner);
    //email could be added if the users email is returned in the user response
  });

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
    console.log(newBid);

    if (newBid.description.length < 20 || newBid.description.length > 140) {
      errorArray.push("The description must be between 20 and 140 characters.");
    }

    if (newBid.amount < 1 || newBid.amount > 20) {
      errorArray.push("The amount must be between 1 and 20.");
    }

    if (newBid.name === "") {
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

  search(item);
});
