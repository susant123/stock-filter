/*
SMA, EMA, Pivot levels, Sentiments
*/
const axios = require("axios");
const constants = require("../../constants");
const utils = require("../../utils");
const path = require("path");
const fs = require("fs");
const volumeData = require("./volumeData");

const chartDataUrl =
  "https://priceapi.moneycontrol.com/techCharts/techChartController/history?symbol={0}&resolution=1D&from={1}&to={2}";

const getStockWiseNSEData = (symbol) => {
  //for epoch date
  const fromTime = Math.floor((new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000) / 1000);

  const toTime = Math.floor(new Date().getTime() / 1000);

  const formattedURL = utils.stringFormat(chartDataUrl, encodeURIComponent(symbol), fromTime, toTime);
  console.log(symbol, "url---", formattedURL);

  const headers = {
    ...constants.headers,
  };
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(formattedURL, {
          withCredentials: true,
          headers: headers,
        })
        .then((res) => {
          resolve(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  });
};

const getAllNSEData = () => {
  for (let i = 0; i < constants.allStocks.length; i++) {
    (function (i) {
      const symbol = constants.allStocks[i].symbol;
      setTimeout(async () => {
        let nseData = await getStockWiseNSEData(symbol);

        //make another request if first request fails
        if (nseData.s === "error") {
          nseData = await getStockWiseNSEData(symbol);
        }

        //allNSEDataObj[symbol] = nseData;

        try {
          fs.writeFile(__dirname + "../../../data/chart/" + symbol + ".json", JSON.stringify(nseData), function (err) {
            if (err) return console.log(err);
          });
        } catch (e) {
          console.log("Error occured");
        }

        console.log("Current position-> " + (i + 1) + " Total Stocks:->" + constants.allStocks.length);
      }, 500 * (i + 1));
    })(i);
  }
};

/* Aggregate individual file section*/
const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    //console.log("path", __dirname + "../../../data/chart/" + fileName + ".json");
    fs.readFile(__dirname + "../../../data/chart/" + fileName + ".json", "utf8", function (err, data) {
      resolve({ [fileName]: JSON.parse(data) });
    });
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
      allData[stockName] = stock[stockName];
    });

    try {
      fs.writeFile(__dirname + "../../../data/chart.json", JSON.stringify(allData), function (err) {
        if (err) return console.log(err);
      });
    } catch (e) {
      console.log("Error occured");
    }
  });
};

/* End of aggregate individual file section*/

const startBuildingChartData = async () => {
  try {
    if (!fs.existsSync(__dirname + "../../../data/chart/")) {
      console.log("creating folder");
      fs.mkdirSync(__dirname + "../../../data/chart/");
    }
  } catch (e) {
    console.log("folder error", e);
  }

  getAllNSEData();

  setTimeout(() => {
    volumeData.startBuildingVolumeData();
    aggregateFiles();
  }, (constants.allStocks.length + 2) * 500);
};

//startBuildingChartData();

module.exports.startBuildingChartData = startBuildingChartData;
