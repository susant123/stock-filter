const axios = require("axios");
const constants = require("./constants");
const utils = require("./utils");
const chart = require("./data-builders/money-control/chartData");
const fs = require("fs");

let cookie;

const instance = axios.create({
  headers: constants.headers,
  cookie: cookie ? cookie : "",
});

const getStockWiseNSEData = (symbol) => {
  const formattedURL = utils.stringFormat(
    constants.nseDataURL,
    encodeURIComponent(symbol)
  );
  console.log(symbol, "url---", formattedURL);

  const headers = {
    ...constants.headers,
    cookie: cookie,
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
      reject("Error occured", error);
    }
  });
};

const refreshCookie = async () => {
  const response = await instance.get(constants.nseBaseURL);
  cookie = response.headers["set-cookie"].join(";");

  console.log("cookie refreshed");
};

const getAllNSEData = (cookie) => {
  let counter = 0;
  const allNSEDataObj = {};
  try {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < constants.allStocks.length; i++) {
        (function (i) {
          const symbol = constants.allStocks[i].symbol;
          setTimeout(async () => {
            if (counter % 40 === 0) {
              refreshCookie();
            }
            let nseData = await getStockWiseNSEData(symbol);

            if (!nseData.info) {
              console.log(
                "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@refetching after refreshing@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
              );
              console.log("nseData---", nseData);
              refreshCookie();
              nseData = await getStockWiseNSEData(symbol);
            }

            allNSEDataObj[symbol] = nseData;
            console.log(
              "Object.keys(allNSEDataObj).length",
              Object.keys(allNSEDataObj).length,
              constants.allStocks.length
            );
            if (
              Object.keys(allNSEDataObj).length ===
                constants.allStocks.length ||
              symbol === "ECLERX"
            ) {
              resolve(allNSEDataObj);
              console.log("All done---------------------");
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
      __dirname + "/data/allNSEData.json",
      __dirname + "/data/z-allNSEData-old" + timeSuffix + ".json",
      (err) => {
        if (err) {
          console.log("Error Found:", err);
        } else {
          console.log("allNSEData.json was copied to allNSEData-old.json");
        }
      }
    );
  } catch (err) {
    console.log("The file could not be copied", err);
  }
};

const startBuildingDataFiles = async () => {
  try {
    const response = await instance.get(constants.nseBaseURL);
    cookie = response.headers["set-cookie"].join(";");
    takeBackup();
    getAllNSEData(cookie)
      .then((response) => {
        console.log("response length", Object.keys(response).length);
        fs.writeFile(
          __dirname + "/data/allNSEData.json",
          JSON.stringify(response),
          function (err) {
            if (err) return console.log(err);
            console.log("all NSE data .json is ready----------------------");
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

//start chartData fetching
chart.startBuildingChartData();
startBuildingDataFiles();
