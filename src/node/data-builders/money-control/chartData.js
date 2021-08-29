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
  let counter = 0;
  const allNSEDataObj = {};
  try {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < constants.allStocks.length; i++) {
        (function (i) {
          const symbol = constants.allStocks[i].symbol;
          setTimeout(async () => {
            const nseData = await getStockWiseNSEData(symbol);
            allNSEDataObj[symbol] = nseData;
            console.log(
              "Current position->" +
                Object.keys(allNSEDataObj).length +
                "Total Stocks:->" +
                constants.allStocks.length
            );
            if (
              Object.keys(allNSEDataObj).length == constants.allStocks.length ||
              symbol == "ECLERX"
            ) {
              resolve(allNSEDataObj);
            }
            counter++;
          }, 500 * (i + 1));
        })(i);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const takeBackup = () => {
  const d = new Date();
  const timeSuffix = d.getTime();

  try {
    fs.copyFile(
      path.join(__dirname, "../../data/chart.json"),
      path.join(__dirname, "../../data/z-chart-old" + timeSuffix + ".json"),
      (err) => {
        if (err) {
          console.log("Error Found:", err);
        } else {
          console.log("copied Successfully");
        }
      }
    );
  } catch (err) {
    console.log("The file could not be copied", err);
  }
};

const startBuildingChartData = async () => {
  try {
    takeBackup();
    getAllNSEData()
      .then((response) => {
        //startFetching volumeData
        volumeData.startBuildingVolumeData();
        console.log("response length", Object.keys(response).length);
        fs.writeFile(
          path.join(__dirname, "../../data/chart.json"),
          JSON.stringify(response),
          function (err) {
            if (err) return console.log(err);
            console.log("chart data .json is ready");
          }
        );
      })
      .catch((error) => {
        console.log("error while accessing", error);
      });
  } catch (error) {
    console.log("Error666666666666666666666", error);
    if (error && error.response && error.response.status === 403) {
      console.log("getCookies =========> error.status === 403");
    } else if (error && error.response && error.response.status === 401) {
      console.log("getCookies =========> error.status === 401");
    } else {
      console.log("getCookies =========> error", error);
    }
  }
};

//startBuildingChartData();

module.exports.startBuildingChartData = startBuildingChartData;
