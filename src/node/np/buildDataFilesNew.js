const axios = require("axios");
const constants = require("../constants");
const utils = require("../utils");

let cookie;

fs = require("fs");

const instance = axios.create({
  headers: constants.headers,
  cookie: cookie ? cookie : "",
});

const getStockWiseNSEData = (url, symbol) => {
  const formattedURL = utils.stringFormat(constants.nseDataURL, symbol);
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
            if (counter % 20 == 0) {
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
              Object.keys(allNSEDataObj).length == constants.allStocks.length
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

const getCookies = async () => {
  try {
    const response = await instance.get(constants.nseBaseURL);
    cookie = response.headers["set-cookie"].join(";");
    getAllNSEData(cookie)
      .then((response) => {
        console.log("response length", Object.keys(response).length);
        fs.writeFile(
          __dirname + "/data/allNSEData.json",
          JSON.stringify(response),
          function (err) {
            if (err) return console.log(err);
            console.log("all NSE data .json is ready");
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

//getCookies();
