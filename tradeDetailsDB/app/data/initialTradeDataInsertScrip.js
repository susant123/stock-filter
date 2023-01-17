const path = require("path");
const tradeDetails = require("../../tradeData/src/data/tradeData.json");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  path.join(__dirname, "..", "db", "tradeData.db"),
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the tradeData database.");
  }
);

db.serialize(function () {
  db.each("SELECT * FROM trade_details", function (err, row) {
    console.log(row.id + ": " + row.name);
  });

  const insertIntoTradeDetails = (
    account,
    stock_name,
    quantity,
    average_price
  ) => {
    db.run(
      `INSERT INTO trade_details (account, stock_name, quantity, average_price) VALUES (?, ?, ?, ?) `,
      [account, stock_name, quantity, average_price],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      }
    );
  };

  const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel", "susant-paytm", "susant-fyers","asha-paytm"];

  for (var i = 0; i < accounts.length; i++) {
    const accountTradeData = tradeDetails.stocks[accounts[i]];
    const account = accounts[i];
    for (var j = 0; j < accountTradeData.length; j++) {
      const { stockName, boughtPrice, quantity } = accountTradeData[j];
      insertIntoTradeDetails(account, stockName, quantity, boughtPrice);
    }
  }

  // close the database connection
  db.close();
});
