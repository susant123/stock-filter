const getRoutes = require("./get-route");
const postRoute = require("./update-route");
const inserRoute = require("./insert-route");

module.exports = function (app, db) {
  getRoutes(app, db);
  postRoute(app, db);
  inserRoute(app, db);
};
