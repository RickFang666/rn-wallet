import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Logo from './Logo';
import SignInForm from './SignInForm';
import ResetPassword from './ResetPassword';
import Register from './Register';
import { isSignedIn } from '../../reducers';
import { signIn } from '../../reducers/account';
import BackgroundImage from '../../components/BackgroundImage';
import TouchToDismissKeyboard from '../../components/TouchToDismissKeyboard';
import WarningMessage from '../../components/WarningMessage';

const Container = styled(BackgroundImage)`
  justify-content: center;
  padding-left: 50;
  padding-right: 50;
`;

const Bottom = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const mapStateToProps = state => ({
  isSignedIn: isSignedIn(state),
});

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

@connect(mapStateToProps)
class SignIn extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSignedIn) {
      this.props.navigation.dispatch(resetAction);
    }
  }

  onSignIn = (username, password) => {
    this.props.dispatch(signIn(username, password))
      .then((action) => {
        if (action.error) {
          this.warning.show();
        }
      });
  }

  onRegister = () => {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <TouchToDismissKeyboard>
        <Container>
          <Logo />
          <SignInForm onSubmit={this.onSignIn} />
          <WarningMessage message="用户名或密码错误" ref={(ref) => { this.warning = ref; }} />
          <Bottom>
            <ResetPassword />
            <Register onPress={this.onRegister} />
          </Bottom>
        </Container>
      </TouchToDismissKeyboard>
    );
  }
}

export default SignIn;
