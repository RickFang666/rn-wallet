import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import Mail from './Mail';
import Mobile from './Mobile';
import RegisterForm from './RegisterForm';
import OPTIONS from './registerationType';
import BackgroundImage from '../../components/BackgroundImage';
import TouchToDismissKeyboard from '../../components/TouchToDismissKeyboard';
import {
  sendVerificationCodeByMail,
  sendVerificationCodeByPhone,
  updateRegisterationInformation,
} from '../../reducers/account';

const Container = styled(BackgroundImage)`
  justify-content: center;
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 60;
  padding-right: 60;
`;

const Options = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

@connect()
class Register extends Component {
  state = {
    option: OPTIONS.mobile,
  }

  onMailSelect = () => this.setState({ option: OPTIONS.mail })

  onMobileSelect = () => this.setState({ option: OPTIONS.mobile })


  onSubmit = (options) => {
    this.props.dispatch(updateRegisterationInformation({
      ...options,
      type: this.state.option,
    }));
    this.props.navigation.navigate('SetPassword');
  }

  sendVerificationCode = (address) => {
    const { option } = this.state;

    if (option === OPTIONS.mail) {
      this.props.dispatch(sendVerificationCodeByMail(address));
    } else if (option === OPTIONS.mobile) {
      this.props.dispatch(sendVerificationCodeByPhone(address));
    }
  }

  render() {
    const { option } = this.state;

    return (
      <TouchToDismissKeyboard>
        <Container>
          <Options>
            <Mobile active={option === OPTIONS.mobile} onPress={this.onMobileSelect} />
            <Mail active={option === OPTIONS.mail} onPress={this.onMailSelect} />
          </Options>
          <RegisterForm
            onSubmit={this.onSubmit}
            type={option}
            sendVerificationCode={this.sendVerificationCode}
          />
        </Container>
      </TouchToDismissKeyboard>
    );
  }
}

export default Register;
