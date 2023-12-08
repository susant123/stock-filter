const axios = require("axios");
const fs = require("fs");

const nseBaseURL = "https://www.nseindia.com/";
const nseURL = "https://www.nseindia.com/api/liveTenderActive-issues"; //NSE500 url

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

const takeBackup = (type) => {
    const d = new Date();
    const timeSuffix = d.getTime();

    try {
        fs.copyFile(__dirname + `/data/${type}.json`, __dirname + `/data/z-${type}` + timeSuffix + ".json", (err) => {
            if (err) {
                console.log("Error Found:", err);
            } else {
                console.log(`${type} was copied to z-${type + timeSuffix}.json`);
            }
        });
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

const startBuildingNSEPriceData = async (type) => {
    try {
        const response = await instance.get(nseBaseURL);
        cookie = response.headers["set-cookie"].join(";");
        takeBackup(type);

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

                fs.writeFile(__dirname + `/data/${type}.json`, JSON.stringify(convertedObj), (err) => {
                    if (err) {
                        console.log("Error Found:", err);
                    } else {
                        console.log(`${type}.json is created`);
                    }
                });
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
//startBuildingNSEPriceData("forthcoming-buyback");
module.exports.startBuildingNSEPriceData = startBuildingNSEPriceData;

/* setInterval(function () {
  startBuildingNSEPriceData();
}, 300000); //5*60*1000 */
