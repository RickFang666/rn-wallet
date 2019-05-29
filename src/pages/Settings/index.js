import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import NotificationToggle from './NotificationToggle';
import BankToggle from './BankToggle';
import Logout from './Logout';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import { Entries, Entry, Divider } from '../../components/Settings';
import { isBankVisible } from '../../reducers';
import { setBankVisibility } from '../../reducers/system';
import { logout } from '../../reducers/account';
import { version } from '../../../package';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
  hasBottom: true,
})`
  display: flex;
  background: #F2F2F2;
`;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

const mapStateToProps = state => ({
  isBankProductsVisible: isBankVisible(state),
});

@connect(mapStateToProps)
class Profile extends Component {
  onLogoutPress= () => {
    this.props.dispatch(logout());
    this.props.navigation.dispatch(resetAction);
  }

  onBankToggle = (status) => {
    this.props.dispatch(setBankVisibility(status));
  }

  render() {
    const { isBankProductsVisible } = this.props;

    return (
      <Container>
        <Entries>
          <NotificationToggle />
          <Divider />
          <BankToggle enabled={isBankProductsVisible} onToggle={this.onBankToggle} />
          <Divider />
          <Entry title="系统版本" value={`V${version}`} />
        </Entries>
        <Entries>
          <Entry title="关于Trio" chevron />
        </Entries>
        <Logout onPress={this.onLogoutPress} />
      </Container>
    );
  }
}

export default Profile;
