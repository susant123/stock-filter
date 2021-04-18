import styled from "@emotion/styled";

export const GridContainer = styled.div`
  max-width: 900px;
  margin: auto;
  border: 1px solid rgb(240, 237, 237);
`;

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
`;

export const DataWrapper = styled.div`
  padding: 10px 10px;
  border-top: 1px solid rgb(240, 237, 237);
  border-left: 1px solid rgb(240, 237, 237);
`;

export const HeaderWrapper = styled.div`
  font-size: 18px;
  background: rgb(0, 51, 153);
  font-weight: bold;
  color: white;
  padding: 10px 10px;
  border-right: 1px solid white;
`;

export const OwnerHeader = styled.div`
  font-size: 28px;
  font-weight: bold;
  padding: 10px;
`;
