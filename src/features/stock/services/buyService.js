import { convertArrayToObject } from "../utils/utilities";

const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];

const profitLossCalc = (currentPrice = 0, boughtPrice) => {
  return boughtPrice
    ? (((currentPrice - boughtPrice) / boughtPrice) * 100).toFixed(1)
    : 0;
};

const getKeyObjectTradeData = (tradeData) => {
  const keyObjectTradeData = [];
  if (tradeData["asha-kite"] && tradeData[accounts[0]]) {
    for (let i = 0; i < accounts.length; i++) {
      keyObjectTradeData[accounts[i]] = convertArrayToObject(
        tradeData[accounts[i]],
        "stock_name"
      );
    }
  }
  ////console.log("keyObjectTradeData", keyObjectTradeData);
  return keyObjectTradeData;
};

const shouldBuyNextAccountStock = (
  nextAccount,
  stockName,
  profitLoss,
  initialTradeData
) => {
  const accountToCheck = nextAccount % 4;
  const stockToCheck = initialTradeData[accounts[accountToCheck]][stockName];
  //console.log("stockToCheck", stockToCheck);

  /*const profitLoss = profitLossCalc(
    stockToCheck.currentPrice,
    stockToCheck.boughtPrice
  );*/
  let isItAlreadyBought = false;
  if (!stockToCheck.quantity) {
    isItAlreadyBought = checkOtherAccount(
      nextAccount + 1,
      stockName,
      initialTradeData
    );
  }
  return !isItAlreadyBought;
};

const checkOtherAccount = (nextAccount, stockName, initialTradeData) => {
  const accountToCheck1 = nextAccount % 4;
  const accountToCheck2 = (nextAccount + 1) % 4;

  const stockToCheck1 = initialTradeData[accounts[accountToCheck1]][stockName];

  const profitLoss1 = profitLossCalc(
    stockToCheck1.currentPrice,
    stockToCheck1.boughtPrice
  );

  const stockToCheck2 = initialTradeData[accounts[accountToCheck2]][stockName];

  /*const profitLoss2 = profitLossCalc(
    stockToCheck2.currentPrice,
    stockToCheck2.boughtPrice
  );*/

  if (
    (stockToCheck1.quantity && profitLoss1 > -5) ||
    (stockToCheck2.quantity && profitLoss1 > -5)
  ) {
    return true;
  }
};

const getAllStockNames = (stocksArr) => {
  const allStocksNames = [];
  for (var i = 0; i < stocksArr.length; i++) {
    allStocksNames.push(stocksArr[i].stock_name);
  }
  return allStocksNames;
};

export const getBuyRecommendations = (livePlusIndicator, tradeData) => {
  const initialTradeData = getKeyObjectTradeData(tradeData);

  let allStocksNameArr = [];
  console.log(
    "getBuyRecommendations@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    tradeData,
    livePlusIndicator
  );
  const buyRecommendations = [];

  const buyRecommendationsObj = {};

  if (tradeData["asha-kite"] && livePlusIndicator) {
    allStocksNameArr = getAllStockNames(tradeData[accounts[0]]);

    for (let j = 0; j < allStocksNameArr.length; j++) {
      const stockWiseData = [];
      for (let i = 0; i < accounts.length; i++) {
        const currentStock = initialTradeData[accounts[i]][allStocksNameArr[j]];
        if (livePlusIndicator[allStocksNameArr[j]]) {
          const currentPrice =
            livePlusIndicator[allStocksNameArr[j]].nse.priceInfo.lastPrice;
          const allLiveStockData = livePlusIndicator[allStocksNameArr[j]];

          if (currentStock) {
            const profitLoss = parseFloat(
              profitLossCalc(currentPrice, currentStock.boughtPrice)
            );
            const buyAccountIndex = (i + 1) % 4;
            stockWiseData.push({
              buyAccount: accounts[buyAccountIndex],
              stockName: currentStock.stockName,
              quantity: currentStock.quantity,
              indicators: allLiveStockData.indicators,
              strength: allLiveStockData.strength,
              weakness: allLiveStockData.weakness,
              opportunities: allLiveStockData.opportunities,
              threat: allLiveStockData.threat,
              volumeData: allLiveStockData.volumeData,
              profitLoss: profitLoss,
            });
          }
        }

        /*const currentStock = initialTradeData[accounts[i]][allStocks[j]];
      const currentPrice =
        livePlusIndicator[allStocks[j]].nse.priceInfo.lastPrice;
      const allLiveStockData = livePlusIndicator[allStocks[j]];
      if (currentStock) {
        const profitLoss = parseFloat(
          profitLossCalc(currentPrice, currentStock.boughtPrice)
        );
        if (profitLoss < -5) {
          const shouldBuyNext = shouldBuyNextAccountStock(
            i + 1,
            allStocks[j],
            profitLoss,
            initialTradeData
          );
          if (shouldBuyNext) {
            const buyAccountIndex = (i + 1) % 4;
            buyRecommendations.push({
              buyAccount: accounts[buyAccountIndex],
              stockName: currentStock.stockName,
              quantity: currentStock.quantity,
              indicators: allLiveStockData.indicators,
              strength: allLiveStockData.strength,
              weakness: allLiveStockData.weakness,
              opportunities: allLiveStockData.opportunities,
              threat: allLiveStockData.threat,
              volumeData: allLiveStockData.volumeData,
              previousAccountLoss: profitLoss,
            });
            break;
          }
        }
      }*/
      }
      console.log("buyRecommendations is called%%%%%%%%%%%%", stockWiseData);
    }
  }

  return buyRecommendations;
};
