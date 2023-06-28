/*
SMA, EMA, Pivot levels, Sentiments
*/
const constants = require("../../constants");
const path = require("path");
const fs = require("fs");

const buildStockListToUpdate = () => {
  const stockList = [];

  return new Promise((resolve, reject)=>{
    for (let i = 0; i < constants.allStocks.length; i++) {
      const fileName = constants.allStocks[i].symbol;
      const path = __dirname + "../../../data/chart/" + fileName + ".json";
  
      if (!fs.existsSync(path)) {      
        console.log("DOES NOT exist:", path);
        stockList.push(constants.allStocks[i]);
      }
    }
    setTimeout(()=>{
      resolve(stockList);
    }, 1000);
  });
};



 buildStockListToUpdate().then((data)=>{
  console.log("curatedStockList - length", data);
 });


