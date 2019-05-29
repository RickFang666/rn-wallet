import React, { Component } from 'react';
import styled from 'styled-components/native';

const Touchable = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  border-radius: 4;
  background: rgba(207, 175, 129, 0.3);
  margin-bottom: 5;
  margin-right: 5;
  width: 30%;
  height: 32;
`;

const Content = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: #333333;
  text-align: center;
`;

export default class SelectedWord extends Component {
  onPress = () => {
    const { word, onPress } = this.props;

    onPress(word);
  }

  render() {
    const { word } = this.props;

    return (
      <Touchable onPress={this.onPress}>
        <Content>{ word }</Content>
      </Touchable>
    );
  }
}

