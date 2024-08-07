const axios = require("axios");
const constants = require("../../constants");
const utils = require("../../utils");
const fs = require("fs");
const volumeData = require("./volumeData");
const path = require("path");

const chartDataUrl =
  "https://priceapi.moneycontrol.com/techCharts/techChartController/history?symbol={0}&resolution=1D&from={1}&to={2}";

const getStockWiseData = async () => {
  for (var i = 0; i < constants.allStocks.length; i++) {
    //create the calls using await
    const symbol = constants.allStocks[i].symbol;
    const fromTime = Math.floor(
      (new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000) / 1000
    );
    const toTime = Math.floor(new Date().getTime() / 1000);
    const formattedURL = utils.stringFormat(
      chartDataUrl,
      encodeURIComponent(symbol),
      fromTime,
      toTime
    );
    console.log(i, "---", symbol, "url---", formattedURL);
    const headers = {
      ...constants.headers,
    };

    const response = await axios.get(formattedURL, {
      withCredentials: true,
      headers: headers,
    });
    if (response.data.s !== "no_data") {
      try {
        fs.writeFile(
          __dirname + "../../../data/chart/" + symbol + ".json",
          JSON.stringify(response.data),
          function (err) {
            if (err)
              return console.log("error while reading file json" + symbol, err);
          }
        );
      } catch (e) {
        console.log("Error occured");
      }
    }
  }
  aggregateFiles();
};

/* Aggregate individual file section*/
const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    //console.log("path", __dirname + "../../../data/chart/" + fileName + ".json");

    fs.readFile(
      __dirname + "../../../data/chart/" + fileName + ".json",
      "utf8",
      function (err, data) {
        try {
          resolve({ [fileName]: JSON.parse(data) });
        } catch (e) {
          console.log(e);
          console.log("fileName--------------------------", fileName);
          console.log("data-------################", data);
        }
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
      allData[stockName] = stock[stockName];
    });

    try {
      fs.writeFile(
        __dirname + "../../../data/chart.json",
        JSON.stringify(allData),
        function (err) {
          if (err) return console.log(err);
        }
      );

      fs.writeFile(
        path.join(__dirname, "./../../../../tradeData/src/data/chart.json"),
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

const startBuildingChartData = async () => {
  try {
    if (!fs.existsSync(__dirname + "../../../data/chart/")) {
      console.log("creating folder chart");
      fs.mkdirSync(__dirname + "../../../data/chart/");
    }
  } catch (e) {
    console.log("folder error", e);
  }

  getStockWiseData();
};

startBuildingChartData();

//module.exports.startBuildingChartData = startBuildingChartData;
