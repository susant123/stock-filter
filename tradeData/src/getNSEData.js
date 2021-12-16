const axios = require("axios");
const fs = require("fs");

const nseBaseURL = "https://www.nseindia.com/";
const nseURL =
  "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20500"; //NSE500 url
const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "accept-language": "en,gu;q=0.9,hi;q=0.8",
  "accept-encoding": "gzip, deflate, br",
};

let cookie;

const instance = axios.create({
  headers: headers,
  cookie: cookie ? cookie : "",
});

const takeBackup = () => {
  const d = new Date();
  const timeSuffix = d.getTime();

  try {
    fs.copyFile(
      __dirname + "/data/nse500.json",
      __dirname + "/data/z-nse500.json" + timeSuffix + ".json",
      (err) => {
        if (err) {
          console.log("Error Found:", err);
        } else {
          console.log("nse500.json was copied to nse500-old.json");
        }
      }
    );
  } catch (err) {
    console.log("The file could not be copied", err);
  }
};

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const startBuildingNSEPriceData = async () => {
  try {
    const response = await instance.get(nseBaseURL);
    cookie = response.headers["set-cookie"].join(";");
    takeBackup();

    const browserHeaders = {
      ...headers,
      cookie: cookie,
    };

    axios
      .get(nseURL, {
        withCredentials: true,
        headers: browserHeaders,
      })
      .then((res) => {
        //resolve(res.data);

        console.log("response length", Object.keys(response).length);

        const convertedObj = convertArrayToObject(res.data.data, "symbol");

        fs.writeFile(
          __dirname + "/data/nse500.json",
          JSON.stringify(convertedObj),
          (err) => {
            if (err) {
              console.log("Error Found:", err);
            } else {
              console.log("nse500.json was copied to nse500-old.json");
            }
          }
        );
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

module.exports.startBuildingNSEPriceData = startBuildingNSEPriceData;

/*setInterval(function () {
  startBuildingDataFiles();
}, 5 * 60 * 1000);*/
