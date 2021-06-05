import React, { useState } from "react";
import Chart from "react-google-charts";

import {
  IconHeaderWrapper,
  ActionIcon,
  TableHeader,
} from "../commonStyles/commonStyles";

import { RSIWrapper } from "./RSILineChart.styles";

const buildChartData = (date = [], rsiData = [], rsiRange) => {
  const data = [["Date", "RSI"]];
  let dataObj = {};

  for (let i = 0; i < date.length; i++) {
    dataObj = [
      new Date(date[i] * 1000).toISOString().split("T")[0],
      rsiData[i],
    ];
    data.push(dataObj);
  }

  return data;
};

/* const isLowRSI = (rsiData) => {
  let total = 0;
  for (let i = 0; i < rsiData.length; i++) {
    total += rsiData[i];
  }
  const average = total / rsiData.length;
  if (average > rsiData[rsiData.length - 1]) {
    return true;
  }
}; */

function RSILineChart({ chartData, rsiData, rsiRange, isLowRsi }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const data = buildChartData(chartData.t, rsiData, rsiRange);
  //const isLowRsi = isLowRSI(rsiData);
  return (
    <RSIWrapper isLowRSI={isLowRsi}>
      <IconHeaderWrapper>
        <ActionIcon onClick={handleClick}>{isOpen ? "-" : "+"}</ActionIcon>
        <TableHeader>RSI Chart(14)</TableHeader>
      </IconHeaderWrapper>
      <Chart
        width={"500px"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          hAxis: {
            title: "Time",
          },
          vAxis: {
            title: "RSI",
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </RSIWrapper>
  );
}

export default RSILineChart;
