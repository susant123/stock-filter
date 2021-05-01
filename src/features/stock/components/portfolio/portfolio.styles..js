import styled from "@emotion/styled";

export const AccountWrapper = styled.div`
  display: flex;
  border: 1px solid green;
  padding: 10px;
  font-weight: bold;
  background: ${(props) => (props.isSelected ? "gray" : "lightgray")};
`;

export const Tabs = styled.div`
  display: flex;
`;

export const AccountWiseTradeData = styled.div``;
