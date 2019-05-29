import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20;
  padding-bottom: 20;
  margin-top: 30;
  background: #FFFFFF;
`;

const Label = styled.Text`
  font-size: 16;
  color: #333333;
`;

export default ({ onPress }) => (
  <Container onPress={onPress}>
    <Label>安全退出</Label>
  </Container>
);
