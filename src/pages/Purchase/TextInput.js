import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60;
  margin-top: 10;
  border-bottom-width: 1;
  border-bottom-color: #E7E7E7;
`;

const Input = styled.TextInput.attrs({
  placeholder: ({ placeholder }) => placeholder,
  placeholderTextColor: 'rgba(51, 51, 51, 0.3)',
  underlineColorAndroid: 'transparent',
})`
  flex: 1;
  font-size: 16;
`;

export default ({
  value, placeholder, onChange, children,
}) => (
  <Container>
    <Input value={`${value}`} placeholder={placeholder} onChangeText={onChange} />
    { children }
  </Container>
);
