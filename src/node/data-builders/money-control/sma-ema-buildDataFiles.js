const axios = require("axios");
const constants = require("../../constants");
const utils = require("../../utils");
//const swot = require("./swot");
const fs = require("fs");

const smaEmaPivotSentimentURL =
  "https://priceapi.moneycontrol.com/pricefeed/techindicator/D/{0}?fields=sentiments,pivotLevels,sma,ema";

//convert getStockWiseNSEData function below  to async await
const getStockWiseData = async () => {
  for (var i = 0; i < constants.allStocks.length; i++) {
    //create the calls using await
    const symbol = constants.allStocks[i].symbol;
    const formattedURL = utils.stringFormat(smaEmaPivotSentimentURL, symbol);
    console.log(i, "---", symbol, "url---", formattedURL);
    const headers = {
      ...constants.headers,
    };

    const response = await axios.get(formattedURL, {
      withCredentials: true,
      headers: headers,
    });

    try {
      fs.writeFile(
        __dirname + "../../../data/sma-ema/" + symbol + ".json",
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
  aggregateFiles();
};

/* const getStockWiseNSEData = (i) => {
  let index = i ? i : 0;
  console.log("index-----------", index);
  if (index + 1 > constants.allStocks.length) {
    aggregateFiles();
    swot.startBuildingSWOTData();
    return;
  }
  const headers = { ...constants.headers };
  return ((index) =>
    new Promise((resolve, reject) => {
      const symbol = constants.allStocks[index].mcScid;
      const stockSymbol = constants.allStocks[index].symbol;
      const formattedURL = utils.stringFormat(smaEmaPivotSentimentURL, symbol);
      console.log("formattedURL-----", formattedURL);

      try {
        axios
          .get(formattedURL, {
            withCredentials: true,
            headers: headers,
          })
          .then((res) => {
            try {
              fs.writeFile(
                __dirname + "../../../data/sma-ema/" + stockSymbol + ".json",
                JSON.stringify(res.data),
                function (err) {
                  if (err)
                    return console.log(
                      "error while reading file json" + symbol,
                      err
                    );
                }
              );
              getStockWiseNSEData(++index);
              resolve(res.data);
            } catch (e) {
              getStockWiseNSEData(++index);
              console.log("Error occured", e);
            }
          })
          .catch((err) => {
            getStockWiseNSEData(++index);
            console.log("Error occurred sma-ema-buildingDataFiles.js", err);
          });
      } catch (error) {
        getStockWiseNSEData(++index);
        console.log(error);
        reject("Error occured", error);
      }
    }))(index);
}; */

/* Aggregate individual file section*/
const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    //console.log("path", __dirname + "../../../data/sma-ema/" + fileName + ".json");
    fs.readFile(
      __dirname + "../../../data/sma-ema/" + fileName + ".json",
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
    const allData = {};
    data.forEach((stock) => {
      const stockName = Object.keys(stock)[0];
      allData[stockName] = stock[stockName].data;
    });

    try {
      fs.writeFile(
        __dirname + "../../../data/sma-ema-pivot-sentiment.json",
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

const startEmaSmaDataFetch = async () => {
  try {
    if (!fs.existsSync(__dirname + "../../../data/sma-ema/")) {
      console.log("creating folder sma-ema");
      fs.mkdirSync(__dirname + "../../../data/sma-ema/");
    }
  } catch (e) {
    console.log("folder error", e);
  }

  getStockWiseData();

  //  aggregateFiles();

  //swot.startBuildingSWOTData();
};

//module.exports.startEmaSmaDataFetch = startEmaSmaDataFetch;

startEmaSmaDataFetch();
