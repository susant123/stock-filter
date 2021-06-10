import React, { useState } from "react";
import Chart from "react-google-charts";
//import { ChartWrapper } from "./LineChart.styles";
import {
  IconHeaderWrapper,
  ActionIcon,
  TableHeader,
} from "../commonStyles/commonStyles";

const buildChartData = (macdChartData) => {
  console.log("macdChartData", macdChartData);
  if(!macdChartData){
    return [];
  }

  const macd = macdChartData[0];
  const signal = macdChartData[1];
  const histogram = macdChartData[2];
  const date = macdChartData[3];

  const data = [["Date", "MACD", "Signal", "Histogram"]];
  let dataObj = {};
  for (let i = 0; i < date.length; i++) {
    dataObj = [
      new Date(date[i] * 1000).toISOString().split("T")[0],
      macd[i],
      signal[i],
      histogram[i],      
    ];
    data.push(dataObj);
  }

  return data;
};

const isPositiveMACDSignal = (macdChartData) =>{
  const macd = macdChartData[0];
  const signal = macdChartData[1];
  return macd[macd.length - 1] >= signal[signal.length - 1];
}

function LineChart({ macdChartData }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const data = buildChartData(macdChartData);

  return (
    <div>
      <IconHeaderWrapper >
        <ActionIcon onClick={handleClick}>{isOpen ? "-" : "+"}</ActionIcon>
        <TableHeader isMacdPositive={isPositiveMACDSignal(macdChartData)} isMacdChart={true}>MACD Chart</TableHeader>
      </IconHeaderWrapper>
      {isOpen && (
        <Chart
          width={500}
          height={350}
          chartType="Line"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            chart: {
              title: "MACD chart",
            },
            width: 500,
            height: 300,
            series: {
              // Gives each series an axis name that matches the Y-axis below.
              0: { axis: "Price" },
              1: { axis: "Volume" },
            },
            axes: {
              // Adds labels to each axis; they don't have to match the axis names.
              y: {
                Price: { label: "Price" },
                Volume: { label: "Volume" },
              },
            },
          }}
          rootProps={{ "data-testid": "4" }}
        />
      )}
    </div>
  );
}

export default LineChart;
