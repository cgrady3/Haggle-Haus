var api = require('./api');

$(document).ready(function() {
  api.grab("items").then(function(response) {
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
});
