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
  grabItem: function(req) {
    return $.ajax({
      url: "/api/items" + req,
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

module.exports = api;
