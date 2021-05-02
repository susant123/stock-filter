module.exports = function (app, db) {
  app.post("/api/post_sell_data", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = req.body;
    console.log("data;;;;;;;;;;;;", data);
    processTradeData(data, res, db);
  });

  function processTradeData(trade, res, db) {
    var account = trade.account;
    var stock_name = trade.stockName;
    var quantity = trade.quantity;
    var average_price = trade.price;
    var sql = `update trade_details
            set quantity = ?, average_price = ?
            where account = ? and stock_name=?;`;

    var values = [quantity, average_price, account, stock_name];

    db.serialize(function () {
      db.run(sql, values, function (err) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else res.send("Success");
      });
    });
  }
};
