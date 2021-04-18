import styled from "@emotion/styled";

export const ShowChart = styled.div`
  background: green;
  padding: 4px;
  color: white;
  width: 200px;
  text-align: center;
  border: 1px solid;
  border-radius: 4px;
  margin: 5px auto;
  cursor: pointer;
`;

export const IFrameContainer = styled.div`
  z-index: 2;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: white;
`;

export const CloseButton = styled.div`
  z-index: 3;
  position: fixed;
  right: 18px;
  top: 10px;
  width: 20px;
  height: 21px;
  border: 3px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  font-weight: bold;
  cursor: pointer;
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;
