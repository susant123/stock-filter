import styled from '@emotion/styled';

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const CardTitle = styled.div`
  font-size: 20px;
  color: black;
  font-weight: bold;
`;

export const CardContainer = styled.div`
  margin: ${(props) => (props.keepSeparated ? '20px 0' : 'auto')};
  min-width: ${(props) => (props.keepSeparated ? '500px' : 'auto')};
  display: ${(props) => (props.keepSeparated ? 'flex' : 'auto')};
  flex-direction: ${(props) => (props.isOpen ? 'column' : 'row')};
  min-width: 30%;
  margin: 20px;
`;

export const IfBought = styled.div`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;
