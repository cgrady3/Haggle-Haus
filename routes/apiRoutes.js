var db = require("../models");
var bcrypt = require("bcryptjs");
const passport = require("../config/passport-config");


module.exports = function(app) {
  //Find all users. TODO: Don't let this grab passwords before production.
  app.get("/api/users", function(req, res) {
    db.users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  //Get a specific user by ID.
  app.get("/api/users/:id", function(req, res) {
    db.users
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/users",
      failureRedirect: "/login"
    })
  );
  
  app.post(
    "/register",
    passport.authenticate("local-signup", {
      successRedirect: "/users",
      failureRedirect: "/register"
    })
  );

  //Delete a user.
  app.delete("/api/users/:id", function(req, res) {
    db.users
      .destroy({
        where: { id: req.params.id }
      })
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  });

  //Post an item for sale
  app.post("/api/items", function(req, res) {
    db.item.create(req.body).then(function(dbItems) {
      res.json(dbItems);
    });
  });

  //Get all items for sale
  app.get("/api/items", function(req, res) {
    db.item
      .findAll({
        include: [{ model: db.users }]
      })
      .then(function(dbItems) {
        res.json(dbItems);
      });
  });

  //Get a specific item by ID.
  app.get("/api/items/:id", function(req, res) {
    db.item
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbItems) {
        res.json(dbItems);
      });
  });

  //Get only items by a specific user
  app.get("/api/items/user/:userid", function(req, res) {
    db.item
      .findAll({
        include: [{ model: db.bid }],
        where: {
          userId: req.params.userid
        }
      })
      .then(function(dbItems) {
        res.json(dbItems);
      });
  });

  //Get only items by a specific name
  app.get("/api/items/:name", function(req, res) {
    db.item
      .findAll({
        where: {
          name: req.params.name
        }
      })
      .then(function(dbItems) {
        res.json(dbItems);
      });
  });

  //Delete an item.
  app.delete("/api/items/:id", function(req, res) {
    db.item
      .destroy({
        where: { id: req.params.id }
      })
      .then(function(dbItem) {
        res.json(dbItem);
      });
  });

  //Post a bid for an item from a user
  app.post("/api/bids", function(req, res) {
    db.Bid.create(req.body).then(function(dbBids) {
      res.json(dbBids);
    });
  });

  //Get all bids for all items from all users
  app.get("/api/bids", function(req, res) {
    db.bid
      .findAll({
        include: [{ model: db.item }, { model: db.users }]
      })
      .then(function(dbBids) {
        res.json(dbBids);
      });
  });

  //Get a specific bid by ID.
  app.get("/api/bids/:id", function(req, res) {
    db.bid
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbBids) {
        res.json(dbBids);
      });
  });

  //Get only bids by a specific user
  app.get("/api/bids/user/:userid", function(req, res) {
    db.bid
      .findAll({
        include: [{ model: db.item }],
        where: { userId: req.params.userid }
      })
      .then(function(dbBids) {
        res.json(dbBids);
      });
  });

  //Get only bids for a specific item
  app.get("/api/bids/item/:itemid", function(req, res) {
    db.bid
      .findAll({
        where: {
          itemId: req.params.itemid
        }
      })
      .then(function(dbBids) {
        res.json(dbBids);
      });
  });

  //Delete an bid
  app.delete("/api/bids/:id", function(req, res) {
    db.bid
      .destroy({
        where: { id: req.params.id }
      })
      .then(function(dbBids) {
        res.json(dbBids);
      });
  });
};
