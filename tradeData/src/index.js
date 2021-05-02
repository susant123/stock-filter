import express from "express";
import fs from "fs";
import http from "http";

import AllRSIData from "./data/new/AllRSIData.json";
import ChartData from "./data/new/chart.json";
import LiveIndicatorData from "./data/new/allData.json";

const bodyParser = require("body-parser");

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

/* app.get("/getTradeData", (req, res) => {
  res.send(TradeData);
}); */

const httpServer = http.createServer(app);
httpServer.listen(port2, () => {
  console.log(`Listening on port ${port2}!`);
});
