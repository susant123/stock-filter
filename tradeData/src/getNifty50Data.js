const axios = require("axios");
const fs = require("fs");

const baseURL = "https://www.indmoney.com/";
const dataURL = `https://indian-stock-broker.indmoney.com/catalog/listing?category=nifty-50-stocks&offset=1&limit=50&analystRecommendation=`;

const headers = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "en-US,en;q=0.9",
  "cache-control": "max-age=0",
  "sec-ch-ua":
    '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "none",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  "Accept-Encoding": "br",
  referrerPolicy: "strict-origin-when-cross-origin",
  cookie:
    "__cf_bm=fzLhvlBrS7VAPgLJoezD3arm8oi7IoR.sDzow6_cs_Y-1694905005-0-AeYQH4q1MPu7ZlIyiqqEGGK3akqRUkfC2Q2ykyF3X6uCUId8J9Ic++BJFfTadY+fY7GlxvlPA84/Mj6rN2Qz7E4=; _ga=GA1.2.1211618069.1694905126; _gid=GA1.2.266384583.1694905126; _gcl_au=1.1.1212092101.1694905126; _clck=1y0hsc6|2|ff2|0|1354; _clsk=tug8em|1694905126611|1|1|m.clarity.ms/collect",
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
      __dirname + `/data/nifty50.json`,
      __dirname + `/data/z-nifty50` + timeSuffix + ".json",
      (err) => {
        if (err) {
          console.log("Error Found:", err);
        } else {
          console.log(`nifty50 was copied to z-nifty50_${timeSuffix}.json`);
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
    /*  const response = await instance.get(baseURL);
    cookie = response.headers["set-cookie"].join(";");
    takeBackup();*/

    const browserHeaders = {
      ...headers,
    };

    console.log(
      "---------------------------------------------------------------------"
    );
    console.log(browserHeaders);

    axios
      .get(dataURL, {
        headers: browserHeaders,
        mode: "cors",
        withCredentials: "include",
      })
      .then((res) => {
        //resolve(res.data);

        console.log("response length", Object.keys(response).length);

        const convertedObj = convertArrayToObject(res.data.data, "symbol");

        fs.writeFile(
          __dirname + `/data/nifty50.json`,
          JSON.stringify(convertedObj),
          (err) => {
            if (err) {
              console.log("Error Found:", err);
            } else {
              console.log(`nifty50.json is created`);
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

//startBuildingNSEPriceData("active-buyback");
startBuildingNSEPriceData();
//module.exports.startBuildingNSEPriceData = startBuildingNSEPriceData;

/* setInterval(function () {
  startBuildingNSEPriceData();
}, 300000); //5*60*1000 */
