/*
SMA, EMA, Pivot levels, Sentiments
*/
const axios = require("axios");
const constants = require("../../constants");
const utils = require("../../utils");
const path = require("path");
//const smaEma = require("./sma-ema-buildDataFiles");
const fs = require("fs");

const volumeDataUrl =
  "https://api.moneycontrol.com/mcapi/v1/stock/price-volume?scId={0}";

const getStockWiseData = async () => {
  const headers = { ...constants.headers };
  for (let i = 0; i < constants.allStocks.length; i++) {
    const symbol = constants.allStocks[i].mcScid;
    const stockSymbol = constants.allStocks[i].symbol;

    const formattedURL = utils.stringFormat(volumeDataUrl, symbol);
    console.log("formattedURL-----", formattedURL);

    try {
      const res = await axios.get(formattedURL, {
        withCredentials: true,
        headers: headers,
      });

      fs.writeFile(
        __dirname + "../../../data/volume/" + stockSymbol + ".json",
        JSON.stringify(res.data),
        function (err) {
          if (err)
            return console.log(
              "error while reading file json" + symbol,
              err + " " + stockSymbol
            );
        }
      );
    } catch (error) {
      console.log("Error occured", error);
    }
  }
  aggregateFiles();
};

/* Aggregate individual file section*/
const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    console.log(
      "path",
      __dirname + "../../../data/volume/" + fileName + ".json"
    );
    fs.readFile(
      __dirname + "../../../data/volume/" + fileName + ".json",
      "utf8",
      function (err, data) {
        resolve({ [fileName]: JSON.parse(data) });
      }
    );
  });
};

const aggregateFiles = () => {
  const promises = [];
  for (let i = 0; i < constants.allStocks.length; i++) {
    const fileName = constants.allStocks[i].symbol;
    promises.push(readFile(fileName));
  }

  Promise.all(promises).then((data) => {
    //console.log("------------------", data);

    const allData = {};

    data.forEach((stock) => {
      const stockName = Object.keys(stock)[0];
      allData[stockName] = stock[stockName].data;
    });

    try {
      fs.writeFile(
        __dirname + "../../../data/volume.json",
        JSON.stringify(allData),
        function (err) {
          if (err) return console.log(err);
        }
      );
    } catch (e) {
      console.log("Error occured");
    }
  });
};
/* End of aggregate individual file section*/

const startBuildingVolumeData = async () => {
  try {
    if (!fs.existsSync(__dirname + "../../../data/volume/")) {
      console.log("creating folder volume");
      fs.mkdirSync(__dirname + "../../../data/volume/");
    }
  } catch (e) {
    console.log("folder error", e);
  }
  getStockWiseData();
};

startBuildingVolumeData();

//module.exports.startBuildingVolumeData = startBuildingVolumeData;
