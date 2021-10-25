import styled from "@emotion/styled";

export const Tab = styled.div`
  font-weight: bold;
  border: 1px solid #999;
  padding: 5px 10px;
  min-width: 80px;
  background: ${props=>props.active?'#888':'#cecece'};
  color: black;
  cursor: pointer;

  &:hover{
    background: #888;
    color: white;
  }
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;