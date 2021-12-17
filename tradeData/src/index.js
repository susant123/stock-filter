import express from "express";
import fs from "fs";
import http from "http";

import AllRSIData from "./data/AllRSIData.json";
import ChartData from "./data/chart.json";
import LiveIndicatorData from "./data/allData.json";
import NSEPriceData from "./data/nse500.json";

const bodyParser = require("body-parser");
const NSEDataBuilder = require("./getNSEData.js");

setInterval(function () {
  NSEDataBuilder.startBuildingNSEPriceData();
}, 300000); //5 * 60 * 1000

let app = express();
app.use(bodyParser.json());
const port2 = 8081;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT");
  next();
});

app.get("/", (req, res) => {
  res.send("I am ready to provide staock data!");
});

app.get("/getAllRSIData", (req, res) => {
  res.send(AllRSIData);
});

app.get("/getChartData", (req, res) => {
  res.send(ChartData);
});

app.get("/getLivePlusIndicatorData", (req, res) => {
  res.send(LiveIndicatorData);
});

app.get("/getNSEPriceData", (req, res) => {
  res.send(NSEPriceData);
});
/* app.get("/getTradeData", (req, res) => {
  res.send(TradeData);
}); */

const httpServer = http.createServer(app);
httpServer.listen(port2, () => {
  console.log(`Listening on port ${port2}!`);
});
