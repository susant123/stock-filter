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

const getAllStockNames = (stocksArr) => {
  let allStocksNames = [];
  for (var i = 0; i < stocksArr.length; i++) {
    allStocksNames.push(stocksArr[i].stock_name);
  }
  return allStocksNames;
};

const calculateBuySuggestion = (stockWiseData) => {
  //console.log("stockWiseData-----", stockWiseData);
  let buyAccount = null;

  stockWiseData.sort((a, b) => {
    const value = (el, quantity) => {
      return el === 0 && !quantity ? Infinity : el;
    };

    return value(a.profitLoss, a.quantity) - value(b.profitLoss, b.quantity);

    /* if (b.profitLoss === 0 || a.profitLoss === 0) {
      return -9999;
    }
    return a.profitLoss - b.profitLoss; */
  });

  const acc1Stock = stockWiseData[0];
  const acc2Stock = stockWiseData[1];
  const acc3Stock = stockWiseData[2];
  const acc4Stock = stockWiseData[3];

  if (
    acc1Stock.quantity &&
    acc1Stock.quantity > 0 &&
    acc1Stock.profitLoss < -5
  ) {
    if (
      acc2Stock.quantity &&
      acc2Stock.quantity > 0 &&
      acc2Stock.profitLoss < -5
    ) {
      if (
        acc3Stock.quantity &&
        acc3Stock.quantity > 0 &&
        acc3Stock.profitLoss < -5
      ) {
        if (
          acc4Stock.quantity &&
          acc4Stock.quantity > 0 &&
          acc4Stock.profitLoss < -5
        ) {
          buyAccount = acc1Stock;
          buyAccount.flagAccounts = [
            acc2Stock.account + ": " + acc2Stock.profitLoss + ",",
            acc3Stock.account + ": " + acc3Stock.profitLoss + ",",
            acc4Stock.account + ": " + acc4Stock.profitLoss + ",",
          ];
        } else if (
          acc4Stock.quantity &&
          acc4Stock.quantity > 0 &&
          acc4Stock.profitLoss > -5
        ) {
          console.log("Have patience", acc4Stock.account, acc4Stock.stockName);
        } else {
          buyAccount = acc4Stock;
          buyAccount.flagAccounts = [
            acc1Stock.account + ": " + acc1Stock.profitLoss + ",",
            acc2Stock.account + ": " + acc2Stock.profitLoss + ",",
            acc3Stock.account + ": " + acc3Stock.profitLoss + ",",
          ];
        }
      } else if (
        acc3Stock.quantity &&
        acc3Stock.quantity > 0 &&
        acc3Stock.profitLoss > -5
      ) {
        console.log("Have patience", acc3Stock.account, acc3Stock.stockName);
      } else {
        buyAccount = acc3Stock;
        buyAccount.flagAccounts = [
          acc1Stock.account + ": " + acc1Stock.profitLoss + ",",
          acc2Stock.account + ": " + acc2Stock.profitLoss + ",",
        ];
      }
    } else if (
      acc2Stock.quantity &&
      acc2Stock.quantity > 0 &&
      acc2Stock.profitLoss > -5
    ) {
      console.log("Have patience", acc2Stock.account, acc2Stock.stockName);
    } else {
      buyAccount = acc2Stock;
      buyAccount.flagAccounts =
        acc1Stock.account + ": " + acc1Stock.profitLoss + ",";
    }
  } else if (
    acc1Stock.quantity &&
    acc1Stock.quantity > 0 &&
    acc1Stock.profitLoss > -5
  ) {
    console.log("Have patience", acc1Stock.account, acc1Stock.stockName);
  }
  return buyAccount;
};

export const getBuyRecommendations = (livePlusIndicator, tradeData) => {
  const initialTradeData = getKeyObjectTradeData(tradeData);
  let allStocksNameArr = [];
  const buyRecommendations = [];

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

              stockWiseData.push({
                account: accounts[i],
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
                macdData: allLiveStockData.macdData,
              });
            }
          }
        }
        if (stockWiseData.length > 0) {
          const recomendedToBuy = calculateBuySuggestion(stockWiseData);
          if (recomendedToBuy) {
            buyRecommendations.push(recomendedToBuy);
          }
        }
      }
    }
  }
  return buyRecommendations;
};
