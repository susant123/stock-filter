var tulind = require("tulind");
var liveData = require("./data/chart.json");

const fs = require("fs");

const allStocks = Object.keys(liveData);

var rsiData = {};
allStocks.forEach((stock) => {
  console.log("StockName---" + stock);
  var chartData = liveData[stock];
  tulind.indicators.rsi.indicator([chartData.c], [14], function (err, results) {
    rsiData[stock] = results[0];
  });
});
const fullFileNameWithPath = __dirname + "/data/AllRSIData.json";
fs.writeFile(fullFileNameWithPath, JSON.stringify(rsiData), function (err) {
  if (err) return console.log(err);
  console.log("AllRSIData.json is ready");
});

console.log(
  "Given these options, the output arrays will be this much shorter than the input arrays:"
);
