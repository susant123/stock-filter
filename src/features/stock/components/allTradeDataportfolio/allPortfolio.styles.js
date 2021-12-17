import styled from "@emotion/styled";

export const PortfolioTable = styled.div`
  display: grid;
  margin-top: 66px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
  width: 100%;
  ${(props) => (props.fixedRow ? "position: fixed; top: 55px;" : "")}
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

export const AdditionalInfo = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
`;
export const Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ccc;
  height: 500px;
  width: 500px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
`;
export const ModalContent = styled.div`
  display: flex;
  align-items: center;
`;
export const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  border-radius: 50px;
  background-color: #fefefe;
  width: 30px;
  height: 30px;
  display: flex;
  border: 1px solid #645959;
  align-items: center;
  justify-content: center;
`;

export const NotLive = styled.span`
  color: red;
`;
