const stockWiseData = [
  { account: "asha-kite", profitLoss: -1, quantity: 10 },
  { account: "asha-angel", profitLoss: -6, quantity: 5 },
  { account: "asha-paytm", profitLoss: 0, quantity: 0 },
  { account: "susant-kite", profitLoss: 2, quantity: 8 },
  { account: "susant-angel", profitLoss: -17, quantity: 10 },
  { account: "susant-paytm", profitLoss: 0, quantity: 0 },
];

const calculateBuySuggestion = (stockWiseData, limitPercentage) => els  {};

const checkBuyStatus = (
  account,
  stockName,
  profitLoss,
  quantity,
  limitPercentage
) => {
  if (quantity && quantity > 0 && profitLoss < limitPercentage) {
  
  } else if (quantity && quantity > 0 && profitLoss > limitPercentage) {
    console.log("Have patience", account, stockName);
  }
};

const limitPercentage = 5;
console.log(calculateBuySuggestion(stockWiseData, limitPercentage));
