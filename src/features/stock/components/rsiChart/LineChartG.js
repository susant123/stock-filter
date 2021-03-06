import React, { useEffect } from "react";

import * as d3 from "d3";
import { ChartWrapper } from "./LineChart.styles";
const width = 500,
  height = 350,
  margin = 20;
const data = [
  { a: 1, b: 3 },
  { a: 2, b: 6 },
  { a: 3, b: 2 },
  { a: 4, b: 12 },
  { a: 5, b: 8 },
];

const buildChartData = (xArray = [], yArray = []) => {
  const data = [];
  let dataObj = {};
  for (let i = 0; i < xArray.length; i++) {
    dataObj = {
      time: new Date(xArray[i]).toISOString().split("T")[0],
      value: yArray[i],
    };
    data.push(dataObj);
  }

  return data;
};

function LineChart({ chartData }) {
  //const { data, width, height } = this.props;
  const data = buildChartData(chartData.t, chartData.c);
  const h = height - 2 * margin,
    w = width - 2 * margin;

  //number formatter
  const xFormat = d3.format(".2");

  //x scale
  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.a)) //domain: [min,max] of a
    .range([margin, w]);

  //y scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.b)]) // domain [0,max] of b (start from 0)
    .range([h, margin]);

  //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
  // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
  const line = d3
    .line()
    .x((d) => x(d.a))
    .y((d) => y(d.b))
    .curve(d3.curveCatmullRom.alpha(0.5)); //curve line

  const xTicks = x.ticks(30).map((d) => {
    const returnVal = (
      <g transform={`translate(${x(d)},${h + margin})`}>
        <text>{xFormat(d)}</text>
        <line x1="0" x1="0" y1="0" y2="5" transform="translate(0,-20)" />
      </g>
    );
  });

  const yTicks = y.ticks(5).map((d) => (
    <g transform={`translate(${margin},${y(d)})`}>
      <text x="-12" y="5">
        {xFormat(d)}
      </text>
      <line x1="0" x1="5" y1="0" y2="0" transform="translate(-5,0)" />
      <line
        className="gridline"
        x1="0"
        x1={w - margin}
        y1="0"
        y2="0"
        transform="translate(-5,0)"
      />
    </g>
  ));

  return (
    <ChartWrapper>
      <svg width={width} height={height}>
        <line className="axis" x1={margin} x2={w} y1={h} y2={h} />
        <line className="axis" x1={margin} x2={margin} y1={margin} y2={h} />
        <path d={line(data)} />
        <g className="axis-labels">{xTicks}</g>
        <g className="axis-labels">{yTicks}</g>
      </svg>
    </ChartWrapper>
  );
}

export default LineChart;
