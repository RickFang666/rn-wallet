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
`;

const Input = styled.TextInput.attrs({
  placeholder: ({ placeholder }) => placeholder,
  secureTextEntry: ({ secure }) => secure,
  placeholderTextColor: 'rgba(51, 51, 51, 0.3)',
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
})`
  flex: 1;
  font-size: 16;
  color: #333333;
`;

export default class TextInput extends Component {
  state = {
    secure: this.props.type === 'password',
  }

  toggleSecure = secure => this.setState({ secure })

  render() {
    const { placeholder, onChange, type } = this.props;
    const { secure } = this.state;

    return (
      <Container>
        <Input placeholder={placeholder} secure={secure} onChangeText={onChange} />
        {
          type === 'password' &&
            <EyeButton theme="light" onChange={this.toggleSecure} secure={secure} />
        }
      </Container>
    );
  }
}
