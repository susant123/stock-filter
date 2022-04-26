import styled from "@emotion/styled";

export const RowWrapper = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 40px 180px 25% 10% 10% 18% 100px 100px;
  background-color: ${(props) => (props.valueChanged ? "#4444ff" : "#fff")};
  margin: 10px;
  ${({isHeader})=>isHeader && "font-weight: 600;"}
`;

export const CellWrapper = styled.div`
  background-color: #eee;
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-size: 18px;
  text-align: center;
  display: flex;
  height: 30px;
  align-items: center;
  ${({isText})=>isText && 'border-color:  rgba(0, 0, 0, 0.2);'}
  ${({clickable})=>clickable && "cursor: pointer;"}
  ${({isSorted})=>isSorted && "background-color: #aaa;"}
`;

export const InputField = styled.input`
  width: 100%;
  height: 88%;
  border: none;
`;

export const ButtonWrapper = styled.button`
  color: black;
  cursor: pointer;
`;
