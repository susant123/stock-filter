import styled from "@emotion/styled";

export const AccountWrapper = styled.div`
  display: flex;
  border: 1px solid green;
  padding: 10px;
  font-weight: bold;
  background: ${(props) => (props.isSelected ? "rgb(0,0,0, 0.6)	" : "rgb(0,0,0, 0.3)")};
  color: ${(props) => (props.isSelected ? "#fff	" : "#000")};
  cursor: pointer;
  &:hover{
    background: ${(props) => (props.isSelected ? "gray" : "lightgray")};
  }
`;

export const Tabs = styled.div`
  display: flex;
  margin: 15px;
`;

export const AccountWiseTradeData = styled.div``;
