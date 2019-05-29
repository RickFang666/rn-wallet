import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Entry from './Entry';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import HomeBackgroundImage from '../../components/HomeBackgroundImage';
import {
  getCurrentWallet,
  getAccountInformation,
} from '../../reducers';
import { logout } from '../../reducers/account';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
  hasBottom: true,
})``;

const Scrollable = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})`
`;

const Header = styled.View`
  display: flex;
  align-items: flex-start;
  padding-top: 40;
  padding-bottom: 40;
  padding-left: 30;
  padding-right: 30;
`;

const UserIdContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22;
  border-radius: 11;
  background: #D1AA65;
  padding-left: 10;
  padding-right: 10;
`;

const UserName = styled.Text`
  font-size: 18;
  color: #FFFFFF;
  margin-bottom: 10;
`;

const UserId = styled.Text`
  font-size: 13;
  color: #FFFFFF;
`;

const Entries = styled.View`
  display: flex;
  background: rgba(117, 117, 117, 0.2);
  border-radius: 6;
  margin-left: 20;
  margin-right: 20;
  margin-top: 10;
  margin-bottom: 10;
`;

const Divider = styled.View`
  border-top-width: 1;
  border-top-color: rgba(231, 231, 231, 0.1);
  margin-left: 60;
`;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

const mapStateToProps = state => ({
  wallet: getCurrentWallet(state),
  account: getAccountInformation(state),
});

@connect(mapStateToProps)
class Profile extends Component {
  onLogoutPress= () => {
    this.props.dispatch(logout());
    this.props.navigation.dispatch(resetAction);
  }

  onWalletPress = () => this.props.navigation.navigate('WalletSettings')

  onSettingsPress = () => this.props.navigation.navigate('Settings')

  onAccountPress = () => this.props.navigation.navigate('Account')

  onAddressBookPress = () => this.props.navigation.navigate('AddressBook')

  render() {
    const { wallet, account } = this.props;

    return (
      <HomeBackgroundImage>
        <Container>
          <Scrollable>
            { account.userId &&
              <Header>
                <UserName>{ account.nickname }</UserName>
                <UserIdContainer>
                  <UserId>{ account.userId }</UserId>
                </UserIdContainer>
              </Header>
            }
            <Entries>
              { wallet &&
                [
                  <Entry key="entry" title="钱包管理" icon="wallet" onPress={this.onWalletPress} />,
                  <Divider key="divider" />,
                ]
              }
              <Entry title="地址管理" icon="notebook" onPress={this.onAddressBookPress} />
            </Entries>
            <Entries>
              { account.userId &&
                [
                  <Entry key="entry" title="账号管理" icon="account-settings" onPress={this.onAccountPress} />,
                  <Divider key="divider" />,
                ]
              }
              <Entry title="系统设置" icon="settings" onPress={this.onSettingsPress} />
            </Entries>
            <Entries>
              <Entry title="帮助中心" icon="help-circle" />
            </Entries>
          </Scrollable>
        </Container>
      </HomeBackgroundImage>
    );
  }
}

export default Profile;
