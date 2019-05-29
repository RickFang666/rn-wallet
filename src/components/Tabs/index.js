import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  border-bottom-width: 1;
  border-bottom-color: #E7E7E7;
`;

export { default as Tab } from './Tab';

export default ({ children }) => (
  <Container>
    { children }
  </Container>
);
