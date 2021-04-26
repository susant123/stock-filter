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
