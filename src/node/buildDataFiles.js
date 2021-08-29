const axios = require("axios");
const constants = require("./constants");
const utils = require("./utils");

//const swot = require("./data-builders/money-control/swot");
const chart = require("./data-builders/money-control/chartData");

const fs = require("fs");

// Start
/*
const path = require("path");
//const stocksConstants = require("../../src/node/constants");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(
  __dirname,
  "../..",
  "tradeDetailsDB",
  "app",
  "data",
  "tradeData.db"
);
console.log("dbPath", dbPath);

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the tradeData database.");
  }
});

const allStocks = [];

db.serialize(function () {
  db.each("SELECT * FROM stock_master", function (err, row) {
    //console.log(row.id + ": " + row.symbol);
    allStocks.push({
      symbol: row.symbol,
      mcScid: row.mcScid,
      mcScdid: row.mcScdid,
      avoid: row.avoid,
    });
  });

  // close the database connection
  db.close();
});

console.log("allStocks", allStocks);
*/
//End

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
            const nseData = await getStockWiseNSEData(symbol);
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
