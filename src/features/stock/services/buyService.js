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

const calculateBuySuggestion = (stockWiseData, limitPercentage) => {
  //console.log("stockWiseData-----", stockWiseData);
  let buyAccount = null;

  stockWiseData.sort((a, b) => {
    const value = (el, quantity) => (el === 0 && !quantity ? Infinity : el);
    return value(a.profitLoss, a.quantity) - value(b.profitLoss, b.quantity);
  });

  const acc1 = stockWiseData[0];
  const acc2 = stockWiseData[1];
  const acc3 = stockWiseData[2];
  const acc4 = stockWiseData[3];

  const isLossMoreThanLimit = (stock) =>
    stock.quantity && stock.quantity > 0 && stock.profitLoss <= limitPercentage;

  const isLossLessThanLimit = (stock) =>
    stock.quantity && stock.quantity > 0 && stock.profitLoss > limitPercentage;

  const flagAccountsStrBuilder = (flagAccounts) => {
    console.log("flagAccounts", flagAccounts);

    let finalStr = "";
    for (let i = 0; i < flagAccounts.length; i++) {
      finalStr +=
        flagAccounts[i].account + ": " + flagAccounts[i].profitLoss + ",";
    }
    return finalStr;
  };

  if (isLossMoreThanLimit(acc1)) {
    if (isLossMoreThanLimit(acc2)) {
      if (isLossMoreThanLimit(acc3)) {
        if (isLossMoreThanLimit(acc4)) {
          buyAccount = acc1;
          buyAccount.flagAccounts = flagAccountsStrBuilder([acc2, acc3, acc4]);
        } else if (isLossLessThanLimit(acc4)) {
          console.log("Have patience", acc4.account, acc4.stockName);
        } else {
          buyAccount = acc4;
          buyAccount.flagAccounts = flagAccountsStrBuilder([acc1, acc2, acc3]);
        }
      } else if (isLossLessThanLimit(acc3)) {
        console.log("Have patience", acc3.account, acc3.stockName);
      } else {
        buyAccount = acc3;
        buyAccount.flagAccounts = flagAccountsStrBuilder([acc1, acc2]);
      }
    } else if (isLossLessThanLimit(acc2)) {
      console.log("Have patience", acc2.account, acc2.stockName);
    } else {
      buyAccount = acc2;
      buyAccount.flagAccounts = flagAccountsStrBuilder([acc1]);
    }
  } else if (isLossLessThanLimit(acc1)) {
    console.log("Have patience", acc1.account, acc1.stockName);
  }
  return buyAccount;
};

export const getBuyRecommendations = (
  livePlusIndicator,
  tradeData,
  limitPercentage,
  nsePriceData
) => {
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
            const currentPrice = nsePriceData[allStocksNameArr[j]]
              ? nsePriceData[allStocksNameArr[j]].lastPrice
              : livePlusIndicator[allStocksNameArr[j]].nse.priceInfo.lastPrice;

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
          const recomendedToBuy = calculateBuySuggestion(
            stockWiseData,
            limitPercentage
          );
          if (recomendedToBuy) {
            buyRecommendations.push(recomendedToBuy);
          }
        }
      }
    }
  }
  return buyRecommendations;
};
