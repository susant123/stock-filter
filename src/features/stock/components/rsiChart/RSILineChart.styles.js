import styled from "@emotion/styled";
export const ChartWrapper = styled.div`
  svg {
    fill: #000;
    fill-opacity: 0.3;
  }

  path {
    stroke: steelblue;
    stroke-width: 2px;
    fill: none;
  }

  .axis {
    stroke: #000;
  }

  .axis-labels text {
    fill: #000;
    fill-opacity: 0.9;
    font-size: 12px;
    text-anchor: middle;
  }

  .axis-labels line {
    stroke: #000;
  }

  .gridline {
    opacity: 0.2;
  }
`;

export const RSIWrapper = styled.div`
  background-color: ${(props) => (props.isLowRSI ? "green" : "red")};
`;
