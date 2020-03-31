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

module.exports = api;
