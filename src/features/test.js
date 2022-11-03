const stockData = require("./testConst");

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
  
    const isLossMoreThanLimit = (stock) => stock.quantity && stock.quantity > 0 && stock.profitLoss <= limitPercentage;
  
    const isLossLessThanLimit = (stock) => stock.quantity && stock.quantity > 0 && stock.profitLoss > limitPercentage;
  
    const flagAccountsStrBuilder = (flagAccounts) => {
      console.log("flagAccounts", flagAccounts);
  
      let finalStr = "";
      for (let i = 0; i < flagAccounts.length; i++) {
        finalStr += flagAccounts[i].account + ": " + flagAccounts[i].profitLoss + ",";
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

    console.log(buyAccount);
    //return buyAccount;
  };

  calculateBuySuggestion(stockData, 10);

