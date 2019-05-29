import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  border-width: 1;
  border-color: #CDA469;
  border-radius: 2;
  padding-top: 2;
  padding-bottom: 2;
  padding-left: 5;
  padding-right: 5;
  margin-left: 15;
`;

const Label = styled.Text`
  font-size: 11;
  color: #CDA469;
`;

export default ({ onPress }) => (
  <Container onPress={onPress}>
    <Label>未备份</Label>
  </Container>
);
