import React, { Component } from 'react';
import styled from 'styled-components/native';

const Touchable = styled.TouchableOpacity`
  border-radius: 4;
  background: ${({ disabled }) => (disabled ? 'rgba(207, 175, 129, 0.3)' : '#FFFFFF')};
  margin-top: 5;
  margin-bottom: 5;
  margin-left: 5;
  margin-right: 5;
`;

const Content = styled.Text`
  font-size: 16;
  line-height: 32;
  font-weight: bold;
  color: #333333;
  min-width: 30%;
  text-align: center;
`;

export default class Word extends Component {
  onPress = () => {
    const { word, onPress } = this.props;

    onPress(word);
  }

  render() {
    const { word, selected } = this.props;

    return (
      <Touchable onPress={this.onPress} disabled={selected}>
        <Content>{ word }</Content>
      </Touchable>
    );
  }
}

