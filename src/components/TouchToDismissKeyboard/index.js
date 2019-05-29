import React from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.TouchableWithoutFeedback.attrs({
  accessible: false,
})`
  display: flex;
  flex: 1;
`;

export default ({ children }) => (
  <Container onPress={Keyboard.dismiss}>
    { children }
  </Container>
);
