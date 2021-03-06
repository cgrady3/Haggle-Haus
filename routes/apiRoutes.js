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
  app.get("/api/users/user", passport.authenticate("local-user"), function(
    req
  ) {
    return json(req.user.id);
  });

  // only allow logged in users to view a user profile
  app.post("/users", passport.authenticate("local-user"), function(req, res) {
    var user = req.user;
    res.json(user);
    console.log(req.user);
  });

  // user login
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/users",
      failureRedirect: "/login"
    })
  );

  // register a user
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
        include: [{ model: db.users }, { model: db.bid }]
      })
      .then(function(dbItems) {
        res.json(dbItems);
      });
  });

  //Get a specific item by ID.
  app.get("/api/item/:id", function(req, res) {
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
  app.get("/api/searchItems/:name", function(req, res) {
    db.item
      .findAll({
        include: [{ model: db.users }, { model: db.bid }],
        where: {
          searchName: req.params.name
        }
      })
      .then(function(dbItem) {
        if (dbItem) {
          res.json(dbItem);
        } else {
          res.send("no items found");
        }
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
    db.bid.create(req.body).then(function(dbBids) {
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
        include: [{ model: db.users }],
        where: {
          itemId: req.params.itemid
        }
      })
      .then(function(dbBids) {
        res.json(dbBids);
      });
  });

  //Update a bid when accepted

  app.put("/api/bids/accept/:id", function(req, res) {
    db.bid
      .update({ accepted: true }, { where: { id: req.params.id } })
      .then(function(dbBids) {
        res.json(dbBids);
      });
  });

  app.put("/api/bids/cancel/:id", function(req, res) {
    db.bid
      .update({ accepted: false }, { where: { id: req.params.id } })
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
