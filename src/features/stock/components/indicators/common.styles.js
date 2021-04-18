import styled from "@emotion/styled";

export const RowWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
export const Cell = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px;
  font-size: 12px;
  text-align: center;
`;
export const HeaderRow = styled(RowWrapper)`
  font-weight: bold;
  background-color: #9b9191;
`;
export const TableHeader = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 0 0 5px 0;
  width: 100%;
`;
export const IconHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const ActionIcon = styled.div`
  font-size: 18px;
  color: rgb(31 4 4 / 91%);
  font-weight: bold;
  border-radius: 18px;
  border: 1px solid #7e4141;
  width: 20px;
  height: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  background-color: #fff;
  cursor: pointer;
`;

//pivot

export const PivotRowWrapper = styled(RowWrapper)`
  background-color: rgba(255, 255, 255, 0.8);
  display: grid;
  grid-template-columns: 70px auto auto auto auto auto auto;
`;
export const PivotHeaderRow = styled(PivotRowWrapper)`
  font-weight: bold;
  background-color: #9b9191;
`;

//sentiments

export const SentimentRowWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  display: grid;
  grid-template-columns: 170px 60px 60px 60px auto;
`;
export const SentimentHeaderRow = styled(SentimentRowWrapper)`
  font-weight: bold;
  background-color: #9b9191;
`;
