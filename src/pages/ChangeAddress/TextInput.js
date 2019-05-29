import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 15;
  padding-bottom: 15;
  margin-top: 10;
`;

const Input = styled.TextInput.attrs({
  placeholder: ({ placeholder }) => placeholder,
  placeholderTextColor: 'rgba(51, 51, 51, 0.3)',
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
})`
  flex: 1;
  font-size: 16;
  color: #333333;
`;

export default ({
  value, placeholder, onChange, disabled, children,
}) => (
  <Container>
    <Input
      value={value}
      placeholder={placeholder}
      onChangeText={onChange}
      disabled={disabled}
    />
    { children }
  </Container>
);
