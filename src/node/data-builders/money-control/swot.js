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
  let counter = 0;
  const allNSEDataObj = {};
  try {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < constants.allStocks.length; i++) {
        (function (i) {
          const symbol = constants.allStocks[i].mcScid;

          const stockSymbol = constants.allStocks[i].symbol;
          setTimeout(async () => {
            const nseData = await getStockWiseNSEData(symbol, type);
            allNSEDataObj[stockSymbol] = nseData.data;
            console.log(
              "symbol--" + stockSymbol + "Object.keys(allNSEDataObj).length",
              Object.keys(allNSEDataObj).length,
              constants.allStocks.length
            );
            if (
              Object.keys(allNSEDataObj).length == constants.allStocks.length ||
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

const takeBackup = (type) => {
  const d = new Date();
  const timeSuffix = d.getTime();

  try {
    fs.copyFile(
      path.join(__dirname, "../../data/" + swot[type] + ".json"),
      path.join(
        __dirname,
        "../../data/z-" + swot[type] + "-old" + timeSuffix + ".json"
      ),
      (err) => {
        if (err) {
          console.log("Error Found:", err);
        } else {
          console.log("Copied successfully-----------");
        }
      }
    );
  } catch (err) {
    console.log("The file could not be copied", err);
  }
};

const startBuildingSWOTData = async (type) => {
  console.log("type-----------", type);
  try {
    takeBackup(type);
    getAllNSEData(type)
      .then((response) => {
        console.log("response length", Object.keys(response).length);
        fs.writeFile(
          path.join(__dirname, "../../data/" + swot[type] + ".json"),
          JSON.stringify(response),
          function (err) {
            if (err) return console.log(err);
            console.log(swot[type] + " data .json is ready");
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

//startBuildingSWOTData();
/* startBuildingSWOTData("S");
startBuildingSWOTData("W");
startBuildingSWOTData("O");
startBuildingSWOTData("T"); */

module.exports.startBuildingSWOTData = startBuildingSWOTData;
