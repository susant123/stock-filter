module.exports = function (app, db) {
  app.post("/api/insert_new_scrip", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    var data = req.body;
    console.log("data;;;;;;;;;;;;", data);
    //res.send("Success");
    const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];
    accounts.forEach((account) => {
      insertNewScript(data.newScrip, account, res, db);
    });

    res.send("Success");
  });
};

function checkIfExist() {
  // TODO: check business
}

function insertNewScript(newScrip, account, res, db) {
  //checkIfExist();

  //INSERT INTO table_name (column1, column2, column3, ...)
  //VALUES (value1, value2, value3, ...);

  var sql = `insert into trade_details (account, stock_name)
           values (?, ?);`;

  var values = [account, newScrip];

  db.serialize(function () {
    db.run(sql, values, function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }
    });
  });
}
