const getRoutes = require("./trade-details-get-route");
const postRoute = require("./product-post-route");

module.exports = function (app, db) {
  getRoutes(app, db);
  postRoute(app, db);
};
