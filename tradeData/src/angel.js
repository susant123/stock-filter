const { SmartAPI, WebSocket } = require("smartapi-javascript");

const smart_api = new SmartAPI({
  api_key: "s0xdbAze",    // PROVIDE YOUR API KEY HERE
   // OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor. 
  // access_token: "YOUR_ACCESS_TOKEN",
  // refresh_token: "YOUR_REFRESH_TOKEN"
});

// If user does not have valid access token and refresh token then use generateSession method 
smart_api.generateSession("S221122", "Sus_2129_agc","795716")
  .then((data) => {
      console.log("First---------------------", data);
      return smart_api.getProfile();

      // User Methods
      // return smart_api.getProfile()

      // return smart_api.logout()

      // return smart_api.getRMS();

      // Order Methods
      // return smart_api.placeOrder({
      //     "variety": "NORMAL",
      //     "tradingsymbol": "SBIN-EQ",
      //     "symboltoken": "3045",
      //     "transactiontype": "BUY",
      //     "exchange": "NSE",
      //     "ordertype": "LIMIT",
      //     "producttype": "INTRADAY",
      //     "duration": "DAY",
      //     "price": "19500",
      //     "squareoff": "0",
      //     "stoploss": "0",
      //     "quantity": "1"
      // })

      // return smart_api.modifyOrder({
      //     "orderid": "201130000006424",
      //     "variety": "NORMAL",
      //     "tradingsymbol": "SBIN-EQ",
      //     "symboltoken": "3045",
      //     "transactiontype": "BUY",
      //     "exchange": "NSE",
      //     "ordertype": "LIMIT",
      //     "producttype": "INTRADAY",
      //     "duration": "DAY",
      //     "price": "19500",
      //     "squareoff": "0",
      //     "stoploss": "0",
      //     "quantity": "1"
      // });

      // return smart_api.cancelOrder({
      //     "variety": "NORMAL",
      //     "orderid": "201130000006424"
      // });

      // return smart_api.getOrderBook();

      // return smart_api.getTradeBook();

    
      // Portfolio Methods
      // return smart_api.getHolding();

      // return smart_api.getPosition();

      // return smart_api.convertPosition({
      //     "exchange": "NSE",
      //     "oldproducttype": "DELIVERY",
      //     "newproducttype": "MARGIN",
      //     "tradingsymbol": "SBIN-EQ",
      //     "transactiontype": "BUY",
      //     "quantity": 1,
      //     "type": "DAY"
      // });


      // GTT Methods
      // return smart_api.createRule({
      //    "tradingsymbol" : "SBIN-EQ",
      //    "symboltoken" : "3045",
      //    "exchange" : "NSE", 
      //    "producttype" : "MARGIN",
      //    "transactiontype" : "BUY",
      //    "price" : 100000,
      //    "qty" : 10,
      //    "disclosedqty": 10,
      //    "triggerprice" : 200000,
      //    "timeperiod" : 365
      // })
      // return smart_api.modifyRule({
      //             "id" : 1000014,
      //             "symboltoken" : "3045",
      //             "exchange" : "NSE", 
      //             "qty" : 10

      // })
      // return smart_api.cancelRule({
      //      "id" : 1000014,
      //      "symboltoken" : "3045",
      //      "exchange" : "NSE"
      // })
      // return smart_api.ruleDetails({
      //     "id" : 25
      // })
      // return smart_api.ruleList({
      //      "status" : ["NEW","CANCELLED"],
      //      "page" : 1,
      //      "count" : 10 
      // })

    // Historical Methods
      // return smart_api.getCandleData({
      //     "exchange": "NSE",
      //     "symboltoken": "3045",
      //     "interval": "ONE_MINUTE",
      //     "fromdate": "2021-02-10 09:00",
      //     "todate": "2021-02-10 09:20"
      // })
  })
  .then((data) => {
      // Profile details
      console.log("data--------------------", data)
  })
  .catch(ex => {
      //Log error
  })