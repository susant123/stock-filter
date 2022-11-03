import { convertArrayToObject } from "../utils/utilities";

const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel", "susant-paytm", "asha-paytm", "susant-fyers"];

export const getKeyObjectTradeData = (tradeData) => {
  const keyObjectTradeData = [];
  if (tradeData) {
    for (let i = 0; i < accounts.length; i++) {
      keyObjectTradeData[accounts[i]] = convertArrayToObject(
        tradeData[accounts[i]],
        "stock_name"
      );
    }
  }
  return keyObjectTradeData;
};

const profitLossCalc = (currentPrice = 0, boughtPrice) => {
  return boughtPrice
    ? (((currentPrice - boughtPrice) / boughtPrice) * 100).toFixed(1)
    : 0;
};

const getAllStockNames = (stocksArr) => {
  const allStocksNames = [];
  for (var i = 0; i < stocksArr.length; i++) {
    allStocksNames.push(stocksArr[i].stock_name);
  }
  return allStocksNames;
};

export const getSellRecommendation = (
  livePlusIndicator,
  tradeData = {},
  nsePriceData = {}
) => {
  let allStocks = [];

  const sellRecommendation = [];

  if (tradeData["asha-kite"] && JSON.stringify(livePlusIndicator) !== "{}") {
    allStocks = getAllStockNames(tradeData["asha-kite"]);
    const initialTradeData = getKeyObjectTradeData(tradeData);
    for (let i = 0; i < accounts.length; i++) {
      for (let j = 0; j < allStocks.length; j++) {
        const currentStock = initialTradeData[accounts[i]][allStocks[j]];
        console.log("allStocks[j]", allStocks[j]);
        if (livePlusIndicator[allStocks[j]]) {
          console.log(
            "allStocks[j]",
            allStocks[j],
            "livePlusIndicator[allStocks[j]].nse",
            livePlusIndicator[allStocks[j]].nse
          );

          if (!livePlusIndicator[allStocks[j]].nse.priceInfo) {
            return [];
          }
          const currentPrice = nsePriceData[allStocks[j]]
            ? nsePriceData[allStocks[j]].lastPrice
            : livePlusIndicator[allStocks[j]].nse.priceInfo.lastPrice;
          if (currentStock) {
            const profit = parseFloat(
              profitLossCalc(
                currentPrice,
                parseFloat(currentStock.average_price)
              )
            );
            if (profit > 5) {
              sellRecommendation.push({
                account: accounts[i],
                stockName: currentStock.stock_name,
                profit: profit,
                quantity: currentStock.quantity,
                currentPrice: currentPrice,
              });
            }
          }
        }
      }
    }
  }

  console.log("sellRecommendation----", sellRecommendation);
  return sellRecommendation;
};
