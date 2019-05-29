import React, { Component } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

const Touchable = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4;
  padding-bottom: 4;
  padding-left: 4;
  padding-right: 4;
`;

const EyeIcon = styled(Icon).attrs({
  name: 'eye',
  size: 20,
  color: ({ theme }) => (theme === 'light' ? '#999999' : '#FFFFFF'),
})``;

const EyeOffIcon = styled(Icon).attrs({
  name: 'eye-with-line',
  size: 20,
  color: ({ theme }) => (theme === 'light' ? '#999999' : '#FFFFFF'),
})``;

export default class EyeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secure: props.secure,
    };
  }

  toggleSecure = () => {
    const nextState = !this.state.secure;
    this.setState({ secure: nextState });
    this.props.onChange(nextState);
  }

  render() {
    const { theme } = this.props;
    const { secure } = this.state;

    return (
      <Touchable onPress={this.toggleSecure}>
        { secure ? <EyeOffIcon theme={theme} /> : <EyeIcon theme={theme} /> }
      </Touchable>
    );
  }
}
