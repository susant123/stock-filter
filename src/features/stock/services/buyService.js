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
  return keyObjectTradeData;
};

const getKeyObjectBuyIndicatorData = (tradeData) => {
  let keyObjectTradeData = [];
  for (let i = 0; i < accounts.length; i++) {
    keyObjectTradeData = convertArrayToObject(tradeData, "account");
  }
  return keyObjectTradeData;
};

const getAllStockNames = (stocksArr) => {
  let allStocksNames = [];
  for (var i = 0; i < stocksArr.length; i++) {
    allStocksNames.push(stocksArr[i].stock_name);
  }
  return allStocksNames;
};

const calculateBuySuggestion = (accountWiseStock) => {
  const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];
  let buyAccount = null;
  for (let i = 0; i < accounts.length; i++) {
    const currentAccountData = accountWiseStock[accounts[i]];
    console.log("currentAccountData--------", currentAccountData);
    if (currentAccountData && currentAccountData.profitLoss) {
      if (currentAccountData.profitLoss < -5) {
        buyAccount = currentAccountData;
      }
    }
  }
  return buyAccount;
};

export const getBuyRecommendations = (livePlusIndicator, tradeData) => {
  const initialTradeData = getKeyObjectTradeData(tradeData);
  let allStocksNameArr = [];
  const buyRecommendations = [];
  const buyRecommendationsObj = {};

  if (tradeData["asha-kite"] && livePlusIndicator) {
    allStocksNameArr = getAllStockNames(tradeData[accounts[0]]);
    if (livePlusIndicator[allStocksNameArr[0]]) {
      for (let j = 0; j < allStocksNameArr.length; j++) {
        const stockWiseData = [];
        for (let i = 0; i < accounts.length; i++) {
          const currentStock =
            initialTradeData[accounts[i]][allStocksNameArr[j]];
          if (livePlusIndicator[allStocksNameArr[j]]) {
            const currentPrice =
              livePlusIndicator[allStocksNameArr[j]].nse.priceInfo.lastPrice;
            const allLiveStockData = livePlusIndicator[allStocksNameArr[j]];

            if (currentStock) {
              const profitLoss = parseFloat(
                profitLossCalc(currentPrice, currentStock.average_price)
              );
              const buyAccountIndex = (i + 1) % 4;
              stockWiseData.push({
                account: accounts[buyAccountIndex],
                stockName: currentStock.stock_name,
                quantity: currentStock.quantity,
                indicators: allLiveStockData.indicators,
                strength: allLiveStockData.strength,
                weakness: allLiveStockData.weakness,
                opportunities: allLiveStockData.opportunities,
                threat: allLiveStockData.threat,
                volumeData: allLiveStockData.volumeData,
                profitLoss: profitLoss,
                nseData: livePlusIndicator[currentStock.stock_name].nse,
              });
            }
          }
        }
        const keyObjectBuyIndicatorData = getKeyObjectBuyIndicatorData(
          stockWiseData
        );
        console.log("stockWiseData---------", keyObjectBuyIndicatorData);
        const recomendedToBuy = calculateBuySuggestion(
          keyObjectBuyIndicatorData
        );
        if (recomendedToBuy) {
          buyRecommendations.push(recomendedToBuy);
        }
      }
    }
  }
  console.log("buyRecommendations--------------------@@@@", buyRecommendations);
  return buyRecommendations;
};
