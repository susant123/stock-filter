const path = require("path");
const stocksConstants = require("../../../src/node/constants");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "..", "data", "tradeData.db");
console.log("dbPath", dbPath);

const db = new sqlite3.Database(
  path.join(__dirname, "..", "data", "tradeData.db"),
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the tradeData database.");
    }
  }
);

db.serialize(function () {
  /*  db.each("SELECT * FROM stock_master", function (err, row) {
    console.log(row.id + ": " + row.name);
  }); */

  const insertIntoStockMaster = (symbol, mcScid, mcScdid, avoid) => {
    db.run(
      `INSERT INTO stock_master (symbol, mcScid, mcScdid, avoid) VALUES (?, ?, ?, ?) `,
      [symbol, mcScid, mcScdid, avoid],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      }
    );
  };

  const allStocks = stocksConstants.allStocks;

  for (var j = 0; j < allStocks.length; j++) {
    const { symbol, mcScid, mcScdid } = allStocks[j];
    insertIntoStockMaster(symbol, mcScid, mcScdid, false);
  }

  // close the database connection
  db.close();
});
