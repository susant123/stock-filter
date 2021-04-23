const path = require("path");

const sqlite3 = require("sqlite3").verbose();
const getNewConnection = () => {
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
  return db;
};

const selectAccountWiseData = (db, account) => {
  return new Promise((resolve, reject) => {
    var accountArr = [];
    db.all(
      "SELECT * FROM trade_details where account='" + account + "'",
      function (err, row) {
        accountArr.push({
          stockName: row.stock_name,
          boughtPrice: row.average_price,
          quantity: row.quantity,
        });
      }
    );
    if (accountArr.length > 0) {
      resolve(accountArr);
    }
  });
};

const getTradeDetails = (cb) => {
  const db = getNewConnection();
  const tradeDetails = {};
  db.serialize(function () {
    console.log("dir name", __dirname);
    const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];
    accounts.forEach((account) => {
      let accountArr = [];
      console.log("account--------", account);
      selectAccountWiseData(db, account)
        .then((data) => {
          console.log("data666666666666", data);
          accountArr = data;
        })
        .catch((err) => {
          console.log("err", err);
        });
      console.log("accountArr", accountArr);
      tradeDetails[account] = accountArr;
    });

    // close the database connection
    db.close();
  });
  console.log("tradeDetails--------", tradeDetails);

  return tradeDetails;
};

getTradeDetails();
