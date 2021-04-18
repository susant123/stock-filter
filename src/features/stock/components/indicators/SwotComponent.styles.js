import styled from "@emotion/styled";
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
export const CountLabel = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const Wrapper = styled.div`
  background-color: ${(props) =>
    props.isRedFlag ? "red" : props.isGreenFlag ? "green" : "inherit"};
`;
