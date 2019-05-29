import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { getAccountInformation } from '../../reducers';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import { Entries, Entry, Divider } from '../../components/Settings';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
  hasBottom: true,
})`
  display: flex;
  background: #F2F2F2;
`;

const mapStateToProps = state => getAccountInformation(state);

@connect(mapStateToProps)
class Account extends Component {
  onChangePhoneNumberPress = () => {
    const { mobile } = this.props;

    this.props.navigation.navigate('ChangeAddress', { addressType: 'mobile', address: mobile });
  }

  onChangeEmailPress = () => {
    const { email } = this.props;

    this.props.navigation.navigate('ChangeAddress', { addressType: 'email', address: email });
  }

  onChangePasswordPress = () => this.props.navigation.navigate('ChangePassword', { passwordType: 'login' })

  onChangeTradingPasswordPress = () => this.props.navigation.navigate('ChangePassword', { passwordType: 'trading' })

  render() {
    const { userId, mobile, email } = this.props;

    return (
      <Container>
        <Entries>
          <Entry title="UID" value={userId} />
          <Divider />
          <Entry title="手机号" value={mobile || '马上绑定'} onPress={this.onChangePhoneNumberPress} chevron />
          <Divider />
          <Entry title="邮箱" value={email || '马上绑定'} onPress={this.onChangeEmailPress} chevron />
        </Entries>
        <Entries>
          <Entry title="修改登录密码" onPress={this.onChangePasswordPress} chevron />
          <Divider />
          <Entry title="修改交易密码" onPress={this.onChangeTradingPasswordPress} chevron />
        </Entries>
      </Container>
    );
  }
}

export default Account;
