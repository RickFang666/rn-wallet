import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 15;
  padding-bottom: 15;
  margin-top: 10;
  border-bottom-width: 1;
  border-bottom-color: #646464;
`;

const Input = styled.TextInput.attrs({
  placeholder: ({ placeholder }) => placeholder,
  secureTextEntry: ({ secure }) => secure,
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
})`
  flex: 1;
  font-size: 16;
  color: #FFFFFF;
`;

export default ({
  icon, placeholder, secure, onChange,
}) => (
  <Container>
    { icon }
    <Input placeholder={placeholder} secure={secure} onChangeText={onChange} />
  </Container>
);
