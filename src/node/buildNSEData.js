const axios = require('axios');
const constants = require('./constants');
const utils = require('./utils');
const chart = require('./data-builders/money-control-new/chartData');
const fs = require('fs');
const path = require('path');

let cookie;

const instance = axios.create({
  headers: constants.headers,
  cookie: cookie ? cookie : '',
});

const getStockWiseNSEData = (symbol) => {
  const formattedURL = utils.stringFormat(
    constants.nseDataURL,
    encodeURIComponent(symbol)
  );
  console.log(symbol, 'url---', formattedURL);

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
      reject('Error occured', error);
    }
  });
};

const refreshCookie = async () => {
  const response = await instance.get(constants.nseBaseURL);
  cookie = response.headers['set-cookie'].join(';');

  console.log('cookie refreshed');
};

const getAllNSEData = (cookie) => {
  //const allNSEDataObj = {};

  for (let i = 0; i < constants.allStocks.length; i++) {
    (function (i, constants) {
      const symbol = constants.allStocks[i].symbol;
      setTimeout(async () => {
        if (i % 40 === 0) {
          refreshCookie();
        }
        let nseData = await getStockWiseNSEData(symbol);

        if (!nseData.info) {
          console.log(
            '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@refetching after refreshing@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
          );
          console.log('nseData---', nseData);
          refreshCookie();
          nseData = await getStockWiseNSEData(symbol);

          try {
            fs.writeFile(
              __dirname + '/data/nse/' + symbol + '.json',
              JSON.stringify(nseData),
              function (err) {
                if (err)
                  return console.log(
                    'error while reading file json' + symbol,
                    err
                  );
              }
            );
          } catch (e) {
            console.log('Error occured', e);
          }

          console.log(
            'Object.keys(allNSEDataObj).length ' +
              (i + 1) +
              ' of ' +
              constants.allStocks.length
          );
        } else {
          //allNSEDataObj[symbol] = nseData;

          try {
            fs.writeFile(
              __dirname + '/data/nse/' + symbol + '.json',
              JSON.stringify(nseData),
              function (err) {
                if (err)
                  return console.log(
                    'error while reading file json' + symbol,
                    err
                  );
              }
            );
          } catch (e) {
            console.log('Error occured', e);
          }

          console.log(
            'Object.keys(allNSEDataObj).length ' +
              (i + 1) +
              ' of ' +
              constants.allStocks.length
          );
        }
      }, constants.nseWaitTime * (i + 1));
    })(i, constants);
  }
};

/* Aggregate individual file section*/
const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    //console.log("path", __dirname + "/data/nse/" + fileName + ".json");

    fs.readFile(
      __dirname + '/data/nse/' + fileName + '.json',
      'utf8',
      function (err, data) {
        try {
          resolve({ [fileName]: JSON.parse(data) });
        } catch (e) {
          console.log(e);
          console.log('fileName--------------------------', fileName);
          console.log('data-------################', data);
        }
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
    //console.log("------------------", data);

    const allData = {};

    data.forEach((stock) => {
      const stockName = Object.keys(stock)[0];
      allData[stockName] = stock[stockName];
    });

    try {
      fs.writeFile(
        __dirname + '/data/allNSEData.json',
        JSON.stringify(allData),
        function (err) {
          if (err) return console.log(err);
        }
      );
    } catch (e) {
      console.log('Error occured');
    }
  });
};

/* End of aggregate individual file section*/

const startBuildingDataFiles = async () => {
  try {
    if (!fs.existsSync(__dirname + '/data/nse/')) {
      console.log('creating folder nse');
      fs.mkdirSync(__dirname + '/data/nse/');
    }
  } catch (e) {
    console.log('folder error', e);
  }

  const response = await instance.get(constants.nseBaseURL);
  cookie = response.headers['set-cookie'].join(';');
  getAllNSEData(cookie);

  setTimeout(() => {
    aggregateFiles();
  }, (constants.allStocks.length + 2) * constants.nseWaitTime);
};

//start chartData fetching
chart.startBuildingChartData();
startBuildingDataFiles();
