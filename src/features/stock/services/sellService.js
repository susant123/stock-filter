import { convertArrayToObject } from "../utils/utilities";

const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];

export const getKeyObjectTradeData = (tradeData) => {
  const keyObjectTradeData = [];
  if (tradeData) {
    for (let i = 0; i < accounts.length; i++) {
      keyObjectTradeData[accounts[i]] = convertArrayToObject(
        tradeData[accounts[i]],
        "stockName"
      );
    }
  }
  ////console.log("keyObjectTradeData", keyObjectTradeData);
  return keyObjectTradeData;
};

const profitLossCalc = (currentPrice = 0, boughtPrice) => {
  return boughtPrice
    ? (((currentPrice - boughtPrice) / boughtPrice) * 100).toFixed(1)
    : 0;
};

export const getSellRecommendation = (livePlusIndicator, tradeData) => {
  const allStocks1 = Object.keys(livePlusIndicator);
  const sellRecommendation = [];
  const initialTradeData = getKeyObjectTradeData(tradeData);
  for (let i = 0; i < accounts.length; i++) {
    for (let j = 0; j < allStocks1.length; j++) {
      const currentStock = initialTradeData[accounts[i]][allStocks1[j]];
      const currentPrice =
        livePlusIndicator[allStocks1[j]].nse.priceInfo.lastPrice;
      if (currentStock) {
        const profit = parseFloat(
          profitLossCalc(currentPrice, parseFloat(currentStock.boughtPrice))
        );
        if (profit > 5) {
          sellRecommendation.push({
            account: accounts[i],
            stockName: currentStock.stockName,
            profit: profit,
            quantity: currentStock.quantity,
            currentPrice: currentPrice,
          });
        }
      }
    }
  }
  return sellRecommendation;
};
