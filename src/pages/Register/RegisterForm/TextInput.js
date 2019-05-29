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
  border-bottom-width: 1;
  border-bottom-color: #646464;
`;

const Input = styled.TextInput.attrs({
  value: ({ value }) => value,
  placeholder: ({ placeholder }) => placeholder,
  secureTextEntry: ({ secure }) => secure,
  editable: ({ disabled }) => !disabled,
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
})`
  flex: 1;
  font-size: 16;
  color: #FFFFFF;
`;

export default ({
  value, placeholder, secure, onChange, disabled, children,
}) => (
  <Container>
    <Input
      value={value}
      placeholder={placeholder}
      secure={secure}
      onChangeText={onChange}
      disabled={disabled}
    />
    { children }
  </Container>
);
