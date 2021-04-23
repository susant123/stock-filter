const getRoutes = require("./trade-details-get-route");

module.exports = function (app, db) {
  getRoutes(app, db);
};
