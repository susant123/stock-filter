var tulind = require("tulind");
var liveData = require("./data/chart.json");

const fs = require("fs");

const allStocks = Object.keys(liveData);

var macdData = {};
allStocks.forEach((stock) => {
  console.log("StockName---" + stock);
  var chartData = liveData[stock];
  tulind.indicators.macd.indicator([chartData.c], [12, 26, 9], function (err, results) {
    results.push(chartData.t);
    macdData[stock] = results;
  });
});
const fullFileNameWithPath = __dirname + "/data/MACDData.json";
fs.writeFile(fullFileNameWithPath, JSON.stringify(macdData), function (err) {
  if (err) return console.log(err);
  console.log("AllMACDData.json is ready");
});

console.log("Given these options, the output arrays will be this much shorter than the input arrays:");
