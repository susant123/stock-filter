const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
const port = 4300;

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("app/data/tradeData.db");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes")(app, db);

app.listen(port, () => {
  console.log("Backend NodeJS live on " + port);
});
