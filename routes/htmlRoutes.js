// Exposes all html routes to server
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  })
}