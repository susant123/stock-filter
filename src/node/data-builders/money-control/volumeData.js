/*
SMA, EMA, Pivot levels, Sentiments
*/
const axios = require("axios");
const constants = require("../../constants");
const utils = require("../../utils");
const path = require("path");
const smaEma = require("./sma-ema-buildDataFiles");
const fs = require("fs");

const volumeDataUrl =
  "https://api.moneycontrol.com/mcapi/v1/stock/price-volume?scId={0}";

const getStockWiseNSEData = (symbol) => {
  const formattedURL = utils.stringFormat(volumeDataUrl, symbol);
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
          const symbol = constants.allStocks[i].mcScid;
          const stockSymbol = constants.allStocks[i].symbol;
          setTimeout(async () => {
            const response = await getStockWiseNSEData(symbol);
            allNSEDataObj[stockSymbol] = response.data;
            console.log(
              "Current position->" +
                Object.keys(allNSEDataObj).length +
                "Total Stocks:->" +
                constants.allStocks.length
            );
            if (
              Object.keys(allNSEDataObj).length == constants.allStocks.length ||
              stockSymbol == "ES07" ||
              stockSymbol == "ECLERX"
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
      path.join(__dirname, "../../data/volume.json"),
      path.join(__dirname, "../../data/z-volume-old" + timeSuffix + ".json"),
      (err) => {
        if (err) {
          console.log("Error Found:", err);
        } else {
          console.log("volume.json was copied to volume-old.json");
        }
      }
    );
  } catch (err) {
    console.log("The file could not be copied", err);
  }
};

const startBuildingVolumeData = async () => {
  try {
    takeBackup();
    getAllNSEData()
      .then((response) => {
        //start smaEmaDataFetch
        smaEma.startEmaSmaDataFetch();
        console.log("response length", Object.keys(response).length);
        fs.writeFile(
          path.join(__dirname, "../../data/volume.json"),
          JSON.stringify(response),
          function (err) {
            if (err) return console.log(err);
            console.log("all volume data .json is ready");
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

//startBuildingVolumeData();

module.exports.startBuildingVolumeData = startBuildingVolumeData;
