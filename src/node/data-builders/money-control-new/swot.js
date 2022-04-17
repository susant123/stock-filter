/*
SMA, EMA, Pivot levels, Sentiments
*/
const axios = require("axios");
const constants = require("../../constants");
const utils = require("../../utils");
const path = require("path");
const fs = require("fs");

const swot = {
  S: "strength",
  W: "weakness",
  O: "opprtunities",
  T: "threat",
};

const dataUrl =
  "https://api.moneycontrol.com/mcapi/v1/swot/details?scId={0}&type={1}";

const getStockWiseNSEData = (symbol, type) => {
  const formattedURL = utils.stringFormat(dataUrl, symbol, type);
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

/*const refreshCookie = async () => {
  const response = await instance.get(baseUrl);
  cookie = response.headers["set-cookie"].join(";");

  console.log("cookie refreshed");
};*/

const getAllNSEData = (type) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < constants.allStocks.length; i++) {
      (function (i, constants) {
        const symbol = constants.allStocks[i].mcScid;

        const stockSymbol = constants.allStocks[i].symbol;
        setTimeout(async () => {
          const nseData = await getStockWiseNSEData(symbol, type);
          //allNSEDataObj[stockSymbol] = nseData.data;

          try {
            fs.writeFile(
              __dirname +
                "../../../data/swot/" +
                type +
                "/" +
                stockSymbol +
                ".json",
              JSON.stringify(nseData),
              function (err) {
                if (err) return console.log(err);
                console.log(
                  "all NSE data .json is ready----------------------"
                );
              }
            );
          } catch (e) {
            console.log("Error occured");
          }

          console.log(
            "symbol--" + stockSymbol + " ",
            i + 1,
            +" of " + constants.allStocks.length
          );
        }, 500 * (i + 1));
      })(i, constants.allStocks.length);
    }
  });
};



/* Aggregate individual file section*/
const readFile = (fileName, folderName) => {
  return new Promise((resolve, reject) => {
    console.log(
      "path",
      __dirname + "../../../data/swot/"+folderName+"/"+ fileName + ".json"
    );
    fs.readFile(
      __dirname + "../../../data/swot/"+folderName+"/" + fileName + ".json",
      "utf8",
      function (err, data) {
        resolve({ [fileName]: JSON.parse(data) });
      }
    );
  });
};

const aggregateFiles = (folderName) => {
  const promises = [];
  
  for (let i = 0; i < constants.allStocks.length; i++) {
    const fileName = constants.allStocks[i].symbol;
    promises.push(readFile(fileName, folderName));
  }

  Promise.all(promises).then((data) => {
    console.log("------------------", data);

    const allData = {};

    data.forEach((stock) => {
      const stockName = Object.keys(stock)[0];
      allData[stockName] = stock[stockName].data;
    });

    try {
      fs.writeFile(
        __dirname + "../../../data/"+folderName+".json",
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


const startBuildingSWOTData = async (type) => {

  try {
    if (!fs.existsSync(__dirname +"../../../data/swot/")) {
      console.log("creating folder");
      fs.mkdirSync(__dirname +"../../../data/swot/");
    }
  } catch (e) {
    console.log("folder error", e);
  }


  try {
    if (!fs.existsSync(__dirname +"../../../data/swot/"+type+"/")) {
      console.log("creating folder");
      fs.mkdirSync(__dirname +"../../../data/swot/"+type+"/");
    }
  } catch (e) {
    console.log("folder error", e);
  }


  console.log("type-----------", type);
  getAllNSEData(type);

  setTimeout(() => {
    aggregateFiles("S");
    aggregateFiles("W");
    aggregateFiles("O");
    aggregateFiles("T");

  }, (constants.allStocks.length+5) * 500);

};

//startBuildingSWOTData();
/* 
startBuildingSWOTData("S");
startBuildingSWOTData("W");
startBuildingSWOTData("O");
startBuildingSWOTData("T"); */

module.exports.startBuildingSWOTData = startBuildingSWOTData;
