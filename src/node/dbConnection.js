module.exports = function () {
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
};
