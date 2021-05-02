const getRoutes = require("./get-route");
const postRoute = require("./update-route");

module.exports = function (app, db) {
  getRoutes(app, db);
  postRoute(app, db);
};
