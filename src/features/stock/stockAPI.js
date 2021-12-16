import axios from "axios";

const baseUrl = "http://localhost:8081";
// A mock function to mimic making an async request for data
export function fetchAllRSIData() {
  const url = baseUrl + "/getAllRSIData";
  return axios.get(url);
}

export function fetchChartData() {
  const url = baseUrl + "/getChartData";
  return axios.get(url);
}

export function fetchLivePlusIndicatorData() {
  const url = baseUrl + "/getLivePlusIndicatorData";
  return axios.get(url);
}

export function fetchTradeData() {
  const url = "http://localhost:4300/api/trade_details/";
  return axios.get(url);
}

export function fetchNSEPriceData() {
  const url = baseUrl + "/getNSEPriceData";
  return axios.get(url);
}

export function postSellData(payload) {
  const url = "http://localhost:4300/api/post_sell_data";
  console.log("postSellData", payload);
  const { stockName, price, quantity, account } = payload;
  return axios({
    method: "post",
    url: url,
    data: {
      stockName,
      price,
      quantity,
      account,
    },
  });
}

export function insertNewScrip(payload) {
  const url = "http://localhost:4300/api/insert_new_scrip";
  console.log("insertNewScrip", payload);
  const { newScrip } = payload;

  return axios({
    method: "post",
    url: url,
    data: {
      newScrip,
    },
  });
}
