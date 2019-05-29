import React, { Component } from 'react';
import styled from 'styled-components/native';

const Touchable = styled.TouchableOpacity.attrs({
  disabled: ({ enabled }) => !enabled,
})`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 20;
  padding-right: 20;
  border-width: 1;
  border-color: ${({ enabled }) => (enabled ? '#333333' : '#BBBBBB')};
  border-radius: 4;
`;

const Label = styled.Text`
  font-size: 16;
  color: ${({ enabled }) => (enabled ? '#333333' : '#BBBBBB')};
`;

const COUNT_DOWN = 60;

export default class SendButton extends Component {
  state = {
    timeout: 0,
  }

  onPress = () => {
    this.props.onPress();
    this.setState({ timeout: COUNT_DOWN });
    const timer = setInterval(() => {
      const { timeout } = this.state;
      if (timeout <= 0) {
        clearInterval(timer);
      } else {
        this.setState({ timeout: timeout - 1 });
      }
    }, 1000);
  }

  render() {
    const { timeout } = this.state;
    const enabled = !timeout;

    return (
      <Touchable enabled={enabled} onPress={this.onPress}>
        <Label enabled={enabled}>{`${enabled ? '获取验证码' : `${timeout}秒后重发`}`}</Label>
      </Touchable>
    );
  }
}
