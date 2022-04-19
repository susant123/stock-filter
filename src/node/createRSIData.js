var tulind = require("tulind");
//var liveData = require("./data/chart.json");
const fs = require("fs");

const constants = require("./constants");

var liveData = {};

for (var i = 0; i < constants.allStocks.length; i++) {
  //constants[i].symbol

  const symbol = constants.allStocks[i].symbol;

  fs.readFile(__dirname + "/data/chart/" + symbol + ".json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // console.log(data);
    liveData[symbol] = JSON.parse(data);
  });
}

setTimeout(() => {
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

  console.log("Given these options, the output arrays will be this much shorter than the input arrays:");
}, 3000);
