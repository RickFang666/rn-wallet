import React, { Component } from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20;
`;

const Checkbox = styled.View`
  width: 16;
  height: 16;
  border-radius: 8;
  border-width: 1;
  border-color: rgba(207, 175, 129, 0.8);
  margin-right: 6;
`;

const Tick = styled.Image.attrs({
  source: require('./tick.png'),
})`
  width: 14;
  height: 14;
`;

const Text = styled.Text`
  font-size: 13;
  color: ${({ theme }) => (theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)')};
`;

const Clickable = styled.TouchableOpacity``;

const Conditions = styled.Text`
  font-size: 13;
  color: rgba(207, 175, 129, 0.8);
`;

export default class Agreement extends Component {
  state = {
    checked: this.props.checked,
  }

  onCheckboxPress = () => {
    const nextState = !this.state.checked;

    this.setState({ checked: nextState });
    this.props.onChange(nextState);
  }

  render() {
    const { theme } = this.props;
    const { checked } = this.state;

    return (
      <Container onPress={this.onCheckboxPress}>
        <Checkbox>
          { checked && <Tick /> }
        </Checkbox>
        <Text theme={theme}>我已阅读并同意</Text>
        <Clickable>
          <Conditions>相关服务条款</Conditions>
        </Clickable>
      </Container>
    );
  }
}
