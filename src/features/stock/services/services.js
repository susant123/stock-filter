import { convertArrayToObject } from "../utils/utilities";

const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];
const keyObjectTradeData = {};
const livePlusIndicator = {};
const initialTradeData = {};

export const addCurrentPriceToTradeData = (
  livePlusIndicator,
  initialTradeData
) => {
  //const livePlusIndicator = useSelector(selectLivePlusIndicatorData);
  const allStocks = Object.keys(livePlusIndicator);

  for (let i = 0; i < accounts.length; i++) {
    for (let j = 0; j < allStocks.length; j++) {
      if (initialTradeData[accounts[i]][allStocks[j]]) {
        console.log(
          "livePlusIndicator[allStocks[j]].nse.priceInfo",
          livePlusIndicator[allStocks[j]].nse
        );
        console.log("accounts[i]", accounts[i]);
        initialTradeData[accounts[i]][allStocks[j]].currentPrice =
          livePlusIndicator[allStocks[j]].nse.priceInfo.lastPrice;
        initialTradeData[accounts[i]][allStocks[j]].indicators =
          livePlusIndicator[allStocks[j]].indicators.data;
        initialTradeData[accounts[i]][allStocks[j]].strength =
          livePlusIndicator[allStocks[j]].strength;
        initialTradeData[accounts[i]][allStocks[j]].weakness =
          livePlusIndicator[allStocks[j]].weakness;
        initialTradeData[accounts[i]][allStocks[j]].opportunities =
          livePlusIndicator[allStocks[j]].opportunities;
        initialTradeData[accounts[i]][allStocks[j]].threat =
          livePlusIndicator[allStocks[j]].threat;
        initialTradeData[accounts[i]][allStocks[j]].volumeData =
          livePlusIndicator[allStocks[j]].volumeData;
      }
    }
  }
};
//addCurrentPriceToTradeData();
//console.log("initialTradeData------------", initialTradeData);
const allStocks = Object.keys(livePlusIndicator);

export const getKeyObjectTradeData = (tradeData) => {
  if (tradeData) {
    for (let i = 0; i < accounts.length; i++) {
      keyObjectTradeData[accounts[i]] = convertArrayToObject(
        tradeData[accounts[i]],
        "stockName"
      );
    }
  }
  ////console.log("keyObjectTradeData", keyObjectTradeData);
  return keyObjectTradeData || [];
};

const profitLossCalc = (currentPrice = 0, boughtPrice) => {
  console.log("currentPrice---", currentPrice, "boughtPrice", boughtPrice);
  return boughtPrice
    ? (((currentPrice - boughtPrice) / boughtPrice) * 100).toFixed(1)
    : 0;
};

//check if other account has already bought this share
const checkOtherAccount = (nextAccount, stockName) => {
  const accountToCheck1 = nextAccount % 4;
  const accountToCheck2 = (nextAccount + 1) % 4;

  const stockToCheck1 = initialTradeData[accounts[accountToCheck1]][stockName];

  const profitLoss1 = profitLossCalc(
    stockToCheck1.currentPrice,
    stockToCheck1.boughtPrice
  );

  const stockToCheck2 = initialTradeData[accounts[accountToCheck2]][stockName];

  const profitLoss2 = profitLossCalc(
    stockToCheck2.currentPrice,
    stockToCheck2.boughtPrice
  );

  if (
    (stockToCheck1.quantity && profitLoss1 > -5) ||
    (stockToCheck2.quantity && profitLoss1 > -5)
  ) {
    return true;
  }
};

//const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];
const shouldBuyNextAccountStock = (nextAccount, stockName) => {
  const accountToCheck = nextAccount % 4;
  const stockToCheck = initialTradeData[accounts[accountToCheck]][stockName];
  //console.log("stockToCheck", stockToCheck);

  const profitLoss = profitLossCalc(
    stockToCheck.currentPrice,
    stockToCheck.boughtPrice
  );

  if (!stockToCheck.quantity) {
    const isItAlreadyBought = checkOtherAccount(nextAccount + 1, stockName);

    return isItAlreadyBought ? false : true;
  }
};

export const getBuyRecommendations = () => {
  const buyRecommendations = [];

  for (let i = 0; i < accounts.length; i++) {
    for (let j = 0; j < allStocks.length; j++) {
      const currentStock = initialTradeData[accounts[i]][allStocks[j]];
      if (currentStock) {
        const profitLoss = profitLossCalc(
          currentStock.currentPrice,
          currentStock.boughtPrice
        );
        if (profitLoss < -5) {
          const shouldBuyNext = shouldBuyNextAccountStock(
            i + 1,
            allStocks[j],
            profitLoss
          );
          if (shouldBuyNext) {
            const buyAccountIndex = (i + 1) % 4;
            buyRecommendations.push({
              buyAccount: accounts[buyAccountIndex],
              stockName: currentStock.stockName,
              quantity: currentStock.quantity,
              indicators: currentStock.indicators,
              strength: currentStock.strength,
              weakness: currentStock.weakness,
              opportunities: currentStock.opportunities,
              threat: currentStock.threat,
              volumeData: currentStock.volumeData,
            });
          }
        }
      }
    }
  }
  console.log("buyRecommendations is called");
  return buyRecommendations;
};

getBuyRecommendations();
