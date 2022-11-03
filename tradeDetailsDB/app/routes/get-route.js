module.exports = function (app, db) {
  // get all trade_details: http://localhost:4300/api/trade_details/
  app.get("/api/trade_details", (req, res) => {
    processData(
      res,
      "SELECT account, stock_name, quantity,  average_price, buy_date, sell_date, avoid, avoid_reason FROM trade_details ORDER BY stock_name"
    );
  });

  function processData(res, sql) {
    db.serialize(function () {
      db.all(sql, function (err, rows) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else sendData(res, rows, err);
      });
    });
  }

  const getAccountKeyTradeData = (tradeData) => {
    const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel", "susant-paytm", "asha-paytm", "susant-fyers"];
    const allAccountDetails = {};
    if (tradeData) {
      for (let i = 0; i < accounts.length; i++) {
        var accountWiseData = [];
        for (let j = 0; j < tradeData.length; j++) {
          if (tradeData[j].account == accounts[i]) {
            accountWiseData.push(tradeData[j]);
          }
        }
        allAccountDetails[accounts[i]] = accountWiseData;
      }
    }
    ////console.log("keyObjectTradeData", keyObjectTradeData);
    return allAccountDetails;
  };

  function sendData(res, data, err) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (data[0]) {
      const accountObj = getAccountKeyTradeData(data);
      res.send(accountObj);
    } else {
      res.status(404).send("No records found");
    }
  }
};
