import styled from "@emotion/styled";

export const PortfolioTable = styled.div`
  display: grid;
  margin-top: 66px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  ${(props) =>
    props.fixedRow
      ? "position: fixed; top: 55px; width: calc(100% - 51px);"
      : ""}
`;

export const Col = styled.div`
  align-items: center;
  display: flex;
  padding: 10px 25px;
  border: 1px solid rgb(240, 237, 237);
  font-weight: ${(props) => (props.isHeader ? "bold" : "normal")};
  background-color: ${(props) => (props.isHeader ? "#cecece" : "white")};
`;

export const InnerRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
`;

export const InnerCol = styled.div`
  align-items: center;
  display: flex;
  padding: 5px 10px;
  font-weight: ${(props) => (props.isHeader ? "bold" : "normal")};
  color: ${(props) => (props.isLoss ? "red" : "black")};
`;
