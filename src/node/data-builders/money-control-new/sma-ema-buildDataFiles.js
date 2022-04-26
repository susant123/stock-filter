/*
SMA, EMA, Pivot levels, Sentiments
*/
const axios = require("axios");
const constants = require("../../constants");
const utils = require("../../utils");
const path = require("path");
const swot = require("./swot");
const fs = require("fs");

const smaEmaPivotSentimentURL =
  "https://priceapi.moneycontrol.com/pricefeed/techindicator/D/{0}?fields=sentiments,pivotLevels,sma,ema";

const getStockWiseNSEData = (symbol) => {
  const formattedURL = utils.stringFormat(smaEmaPivotSentimentURL, symbol);
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

const getAllNSEData = (cookie) => {
  for (let i = 0; i < constants.allStocks.length; i++) {
    (function (i) {
      const symbol = constants.allStocks[i].mcScid;
      const stockSymbol = constants.allStocks[i].symbol;
      setTimeout(async () => {
        const nseData = await getStockWiseNSEData(symbol);

        // allNSEDataObj[stockSymbol] = nseData.data;

        try {
          fs.writeFile(
            __dirname + "../../../data/sma-ema/" + stockSymbol + ".json",
            JSON.stringify(nseData),
            function (err) {
              if (err) return console.log(err);
            }
          );
        } catch (e) {
          console.log("Error occured");
        }

        console.log("Current length: "+ i + 1+ "/"+ constants.allStocks.length);
      }, 500 * (i + 1));
    })(i);
  }
};

/* Aggregate individual file section*/
const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    //console.log("path", __dirname + "../../../data/sma-ema/" + fileName + ".json");
    fs.readFile(__dirname + "../../../data/sma-ema/" + fileName + ".json", "utf8", function (err, data) {
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
      allData[stockName] = stock[stockName].data;
    });

    try {
      fs.writeFile(__dirname + "../../../data/sma-ema-pivot-sentiment.json", JSON.stringify(allData), function (err) {
        if (err) return console.log(err);
      });
    } catch (e) {
      console.log("Error occured");
    }
  });
};
/* End of aggregate individual file section*/

const startEmaSmaDataFetch = async () => {
  try {
    if (!fs.existsSync(__dirname + "../../../data/sma-ema/")) {
      console.log("creating folder");
      fs.mkdirSync(__dirname + "../../../data/sma-ema/");
    }
  } catch (e) {
    console.log("folder error", e);
  }

  getAllNSEData();

  setTimeout(() => {
    swot.startBuildingSWOTData("S");
    swot.startBuildingSWOTData("W");
    swot.startBuildingSWOTData("O");
    swot.startBuildingSWOTData("T");

    aggregateFiles();
  }, (constants.allStocks.length + 2) * 500);
};

module.exports.startEmaSmaDataFetch = startEmaSmaDataFetch;

//startEmaSmaDataFetch();
