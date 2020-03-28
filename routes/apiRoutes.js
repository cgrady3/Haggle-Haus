var db = require("../models");

module.exports = function(app) {
  //Find all users. TODO: Don't let this grab passwords before production.
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  //Get a specific user by ID.
  app.get("/api/users/:id", function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  //Create a new user.
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  //Delete a user.
  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({
      where: { id: req.params.id }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  //Post an item for sale
  app.post("/api/items", function(req, res) {
    db.Item.create(req.body).then(function(dbItems) {
      res.json(dbItems);
    });
  });

  //Get all items for sale
  app.get("/api/items", function(req, res) {
    db.Item.findAll({ include: [{ model: db.Users }] }).then(function(dbItems) {
      res.json(dbItems);
    });
  });

  //Get a specific user by ID.
  app.get("/api/items/:id", function(req, res) {
    db.Item.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbItems) {
      res.json(dbItems);
    });
  });

  //Get only items by a specific user
  app.get("/api/items/user/:userid", function(req, res) {
    db.Item.findOne({
      where: {
        UserId: req.params.userid
      }
    }).then(function(dbItems) {
      res.json(dbItems);
    });
  });

  //Delete an item.
  app.delete("/api/items/:id", function(req, res) {
    db.Item.destroy({
      where: { id: req.params.id }
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });
};
