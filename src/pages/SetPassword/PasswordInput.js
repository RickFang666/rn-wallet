import React, { Component } from 'react';
import styled from 'styled-components/native';
import EyeButton from '../../components/EyeButton';

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

export default class TextInput extends Component {
  state = {
    secure: true,
  }

  toggleSecure = secure => this.setState({ secure })

  render() {
    const { placeholder, onChange } = this.props;
    const { secure } = this.state;

    return (
      <Container>
        <Input placeholder={placeholder} secure={secure} onChangeText={onChange} />
        <EyeButton onChange={this.toggleSecure} secure={secure} />
      </Container>
    );
  }
}
