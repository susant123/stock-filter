module.exports = function (app) {
  const db = require("./dbConnection");
  // Load all products: http://localhost:4300/api/product/
  app.get("/api/product", (req, res) => {
    processData(
      res,
      "SELECT account, stock_name, quantity,  average_price FROM products"
    );
  });

  // Load products: http://localhost:4300/api/product/sort/$attribute
  // example: http://localhost:4300/api/product/sort/price
  //          http://localhost:4300/api/product/sort/name
  // $attribute = ['name', 'price', 'currency', 'description']*
  //account":"asha-kite","stock_name":"ADANITRANS","quantity":null,"average_price"
  app.get("/api/product/sort/:way", (req, res) => {
    processData(
      res,
      "SELECT account, stock_name, quantity,  average_price FROM trade_details order by " +
        req.params.way
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

  export const getKeyObjectTradeData = (tradeData) => {
    if (tradeData) {
      for (let i = 0; i < accounts.length; i++) {
        keyObjectTradeData[accounts[i]] = convertArrayToObject(
          tradeData[accounts[i]],
          "account"
        );
      }
    }
    ////console.log("keyObjectTradeData", keyObjectTradeData);
    return keyObjectTradeData || [];
  };

  function sendData(res, data, err) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (data[0]) {
      res.send(tradeObjectData);
    } else {
      res.status(404).send("Product not found");
    }
  }
};
