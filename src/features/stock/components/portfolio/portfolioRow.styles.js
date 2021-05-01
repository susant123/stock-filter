import styled from "@emotion/styled";

export const RowWrapper = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 18% 18% 18% 100px 100px;
  background-color: ${(props) => (props.valueChanged ? "#4444ff" : "#fff")};
  margin: 10px;
`;

export const CellWrapper = styled.div`
  background-color: #eee;
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-size: 20px;
  text-align: center;
  display: flex;
  height: 30px;
  align-items: center;
`;

export const InputField = styled.input`
  width: 100%;
  height: 88%;
  border: none;
`;

export const ButtonWrapper = styled.button`
  color: black;
`;
