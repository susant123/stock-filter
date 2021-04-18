import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import path from "path";

import AllRSIData from "./data/AllRSIData.json";
import ChartData from "./data/chart-6month.json";
import LiveIndicatorData from "./data/livePlusIndicator.json";

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

const httpServer = http.createServer(app);
httpServer.listen(port2, () => {
  console.log(`Listening on port ${port2}!`);
});

const updateUrlsForDevMode = (mockSurvey) => ({
  ...mockSurvey,
  metadata: {
    ...mockSurvey.metadata,
    custom_post_rv_url: "http://localhost:8081/api/v1/runtime/raasPostSurvey",
    filtered_answers_url:
      "http://localhost:8081/api/v1/runtime/filteredAnswers",
    container_validation_url:
      "http://localhost:8081/api/v1/runtime/containerValidation",
  },
});
