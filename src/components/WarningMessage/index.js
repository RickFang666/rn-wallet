import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20;
  left: 0;
  right: 0;
`;

const Bubble = styled(Animatable.View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 50;
  padding-right: 50;
  padding-top: 10;
  padding-bottom: 10;
  border-radius: 4;
  background: rgba(207, 175, 129, 1);
  opacity: 0;
`;

const WarningIcon = styled(Icon).attrs({
  name: 'ios-warning-outline',
  size: 20,
  color: '#FFFFFF',
})``;

const Label = styled.Text`
  font-size: 14;
  color: #FFFFFF;
  margin-left: 10;
`;

class WarningMessage extends Component {
  componentWillUnmount() {
    clearTimeout(this.timerHandler);
  }

  show = () => {
    clearTimeout(this.timerHandler);
    this.bubble.stopAnimation();
    this.bubble.fadeInUp(800).then(() => {
      this.timerHandler = setTimeout(() => {
        this.bubble.fadeOut(300);
      }, 2000);
    });
  }

  render() {
    const { message } = this.props;

    return (
      <Container>
        <Bubble innerRef={(ref) => { this.bubble = ref; }}>
          <WarningIcon />
          <Label>{ message }</Label>
        </Bubble>
      </Container>
    );
  }
}

export default WarningMessage;
