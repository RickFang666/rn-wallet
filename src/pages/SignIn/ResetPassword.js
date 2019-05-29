import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity``;

const Label = styled.Text`
  font-size: 14;
  color: rgba(255, 255, 255, 0.6);
`;

export default () => (
  <Container>
    <Label>忘记密码</Label>
  </Container>
);
