const axios = require("axios");
const constants = require("./constants");
const utils = require("./utils");
//const chart = require("./data-builders/money-control/chartData");
const fs = require("fs");

let cookie;

const instance = axios.create({
  headers: constants.headers,
  cookie: cookie ? cookie : "",
});

const refreshCookie = async () => {
  const response = await instance.get(constants.nseBaseURL);
  cookie = response.headers["set-cookie"].join(";");

  console.log("cookie refreshed");
};

//convert getStockWiseNSEData function below  to async await

function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const getStockWiseData = async () => {
  for (var i = 0; i < constants.allStocks.length; i++) {
    //create the calls using await
    const symbol = constants.allStocks[i].symbol;
    if (!cookie) {
      cookie = refreshCookie();
    }

    if (i % 20 === 0) {
      cookie = refreshCookie();
      await wait(3000);
    }

    console.log("Start");

    await wait(1000);

    console.log("end");

    const headers = {
      ...constants.headers,
      cookie: cookie,
    };
    const formattedURL = utils.stringFormat(
      constants.nseDataURL,
      encodeURIComponent(symbol)
    );
    console.log(i, "---", symbol, "url---", formattedURL);

    let response = {};

    try {
      response = await axios.get(formattedURL, {
        withCredentials: true,
        headers: headers,
      });
    } catch (error) {
      console.log("Error occurred--buildNSEData-adv.js", error);
    }

    try {
      fs.writeFile(
        __dirname + "/data/nse/" + symbol + ".json",
        JSON.stringify(response.data),
        function (err) {
          if (err)
            return console.log("error while reading file json" + symbol, err);
        }
      );
    } catch (e) {
      console.log("Error occured", e);
    }
  }
  aggregateFiles();
};

/* Aggregate individual file section*/
const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      __dirname + "/data/nse/" + fileName + ".json",
      "utf8",
      function (err, data) {
        try {
          resolve({ [fileName]: JSON.parse(data) });
        } catch (e) {}
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
    const allData = {};
    data.forEach((stock) => {
      const stockName = Object.keys(stock)[0];
      allData[stockName] = stock[stockName];
    });
    try {
      fs.writeFile(
        __dirname + "/data/allNSEData.json",
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

const startBuildingDataFiles = async () => {
  try {
    if (!fs.existsSync(__dirname + "/data/nse/")) {
      console.log("creating folder nse");
      fs.mkdirSync(__dirname + "/data/nse/");
    }
  } catch (e) {
    console.log("folder error", e);
  }
  const response = await instance.get(constants.nseBaseURL);
  cookie = response.headers["set-cookie"].join(";");
  getStockWiseData();
};

//start chartData fetching
//chart.startBuildingChartData();
startBuildingDataFiles();
