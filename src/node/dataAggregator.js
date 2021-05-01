const nse = require("./data/allNSEData.json");
const indicators = require("./data/sma-ema-pivot-sentiment.json");
const strength = require("./data/strength.json");
const weakness = require("./data/weakness.json");
const opportunities = require("./data/opprtunities.json");
const threat = require("./data/threat.json");
const volumeData = require("./data/volume.json");

fs = require("fs");
const path = require("path");

console.log("indicators", indicators);

const allSymbols = Object.keys(nse);

const allData = {};

allSymbols.forEach((symbol) => {
  const symbolData = {
    nse: nse[symbol],
    indicators: indicators[symbol],
    weakness: weakness[symbol],
    opportunities: opportunities[symbol],
    threat: threat[symbol],
    strength: strength[symbol],
    volumeData: volumeData[symbol],
  };
  allData[symbol] = symbolData;
});

/* const allData = {
  nse,
  indicators,
  strength,
  weakness,
  opportunities,
  threat: threat,
};
*/

fs.writeFile(
  path.join(__dirname, "./data/allData.json"),
  JSON.stringify(allData),
  function (err) {
    if (err) return console.log(err);
    console.log("all NSE data .json is ready");
  }
);
