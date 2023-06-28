const axios = require('axios');
const constants = require('../../constants');
const utils = require('../../utils');
const path = require('path');
const fs = require('fs');
const dataUrl =
  'https://api.moneycontrol.com/mcapi/v1/swot/details?scId={0}&type={1}';

const types = ['S', 'W', 'O', 'T'];

const getStockWiseNSEData = (i, typeIndex) => {
  let index = i ? i : 0;
  let tIndex = typeIndex ? typeIndex : 0;
  let type = types[tIndex];
  console.log('index-----------', index, type);
  if (index + 1 > constants.allStocks.length) {
    aggregateFiles(type);
    console.log('tIndex--', tIndex);
    if (tIndex + 1 < types.length) {
      getStockWiseNSEData(0, ++tIndex);
    }
    return;
  }
  const headers = { ...constants.headers };
  return ((index) =>
    new Promise((resolve, reject) => {
      const symbol = constants.allStocks[index].mcScid;
      const stockSymbol = constants.allStocks[index].symbol;
      const formattedURL = utils.stringFormat(dataUrl, symbol, type);
      console.log('formattedURL-----', formattedURL);

      try {
        axios
          .get(formattedURL, {
            withCredentials: true,
            headers: headers,
          })
          .then((res) => {
            try {
              fs.writeFile(
                __dirname +
                  '../../../data/swot/' +
                  type +
                  '/' +
                  stockSymbol +
                  '.json',
                JSON.stringify(res.data),
                function (err) {
                  if (err)
                    return console.log(
                      'error while reading file json' + symbol,
                      err
                    );
                }
              );
              getStockWiseNSEData(++index, tIndex);
              resolve(res.data);
            } catch (e) {
              console.log('Error occured', e);
            }
          });
      } catch (error) {
        console.log('In catch', error);
        reject('Error occured', error);
      }
    }))(index);
};

/* Aggregate individual file section*/

const dummyData = {
  success: 1,
  data: {
    info: ['Dummy data', "Wasn't successful, dummy data"],
    resultType: 'Dummy',
    count: 'dummy count',
    shareUrl:
      'https://www.moneycontrol.com/swot-analysis/eclerxservices/eS06/threat',
  },
};

const readFile = (fileName, folderName) => {
  console.log('file name = ' + fileName, 'Folder name =' + folderName);
  return new Promise((resolve, reject) => {
    //console.log("path", __dirname + "../../../data/swot/" + folderName + "/" + fileName + ".json");

    try {
      fs.readFile(
        __dirname +
          '../../../data/swot/' +
          folderName +
          '/' +
          fileName +
          '.json',
        'utf8',
        (err, data) => {
          //console.log("data----", data);
          if (err) {
            resolve({ [fileName]: dummyData });
            return;
          }
          resolve({ [fileName]: JSON.parse(data) });
        }
      );
    } catch (e) {
      console.log('Error occured', e);
    }
  });
};

const aggregateFiles = (folderName) => {
  const promises = [];

  for (let i = 0; i < constants.allStocks.length; i++) {
    const fileName = constants.allStocks[i].symbol;
    promises.push(readFile(fileName, folderName));
  }

  Promise.all(promises).then((data) => {
    //console.log("------------------", data);

    const allData = {};

    data.forEach((stock) => {
      const stockName = Object.keys(stock)[0];
      allData[stockName] = stock[stockName].data;
    });

    try {
      fs.writeFile(
        __dirname + '../../../data/' + folderName + '.json',
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

const startBuildingSWOTData = async () => {
  try {
    if (!fs.existsSync(__dirname + '../../../data/swot/')) {
      console.log('creating folder swot');
      fs.mkdirSync(__dirname + '../../../data/swot/');
    }
  } catch (e) {
    console.log('folder error', e);
  }

  try {
    if (!fs.existsSync(__dirname + '../../../data/swot/S/')) {
      console.log('creating folder swot type S');
      fs.mkdirSync(__dirname + '../../../data/swot/S/');
    }
    if (!fs.existsSync(__dirname + '../../../data/swot/W/')) {
      console.log('creating folder swot type W');
      fs.mkdirSync(__dirname + '../../../data/swot/W/');
    }
    if (!fs.existsSync(__dirname + '../../../data/swot/O/')) {
      console.log('creating folder swot type , O');
      fs.mkdirSync(__dirname + '../../../data/swot/O/');
    }
    if (!fs.existsSync(__dirname + '../../../data/swot/T/')) {
      console.log('creating folder swot type == , T');
      fs.mkdirSync(__dirname + '../../../data/swot/T/');
    }
  } catch (e) {
    console.log('folder error', e);
  }

  getStockWiseNSEData(0, 0);
};

//startBuildingSWOTData();

module.exports.startBuildingSWOTData = startBuildingSWOTData;
