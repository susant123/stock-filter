import React, { useState } from "react";
import Chart from "react-google-charts";
//import { ChartWrapper } from "./LineChart.styles";
import {
  IconHeaderWrapper,
  ActionIcon,
  TableHeader,
} from "../commonStyles/commonStyles";

const buildChartData = (date = [], price = [], volume = []) => {
  const data = [["Date", "Price", "Volume"]];
  let dataObj = {};
  //console.log("xArray", date.length);
  for (let i = 0; i < date.length; i++) {
    dataObj = [
      new Date(date[i] * 1000).toISOString().split("T")[0],
      price[i],
      volume[i],
    ];
    data.push(dataObj);
  }

  return data;
};

function LineChart({ chartData }) {
  //console.log("chartData", chartData);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const data = buildChartData(chartData.t, chartData.c, chartData.v);
  //console.log("data", data);
  return (
    <div>
      <IconHeaderWrapper>
        <ActionIcon onClick={handleClick}>{isOpen ? "-" : "+"}</ActionIcon>
        <TableHeader>Price-Volume Chart</TableHeader>
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
              title: "Price volume chart",
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
