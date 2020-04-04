var isAuthenticated = require('../config/auth');

module.exports = function(app) {
  // Load welcome/sign-in page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/register", function(req, res) {
    res.render("register");
  });

  // Load main market page and pass in signed-in users id
  app.get("/", function(req, res) {
    res.render('home');
  });

  // Load main market page and pass in signed-in users id
  app.get("/home/:id/:item", function(req, res) {
    res.render('search');
  });

  app.get("/users", isAuthenticated, function(req, res) {
    res.render("users", { current_user: req.user });
  });
  
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
  });

  // Load about page
  app.get("/aboutTheHaus/:id", function(req, res) {
    res.render('about');
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
