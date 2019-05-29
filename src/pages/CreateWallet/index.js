import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import uuid from 'uuid/v4';
import { generateMnemonic, mnemonicToSeedHex } from 'bip39';
import WarningSection from './WarningSection';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import { PasswordInput } from '../../components/Form';
import Button from '../../components/Button';
import Agreement from '../../components/Agreement';
import { createWallet } from '../../reducers/wallets';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  flex: 1;
`;

const FormSection = styled.View`
  flex: 1;
  background: #FFFFFF;
  padding-left: 20;
  padding-right: 20;
`;

const CreateButton = styled(Button)`
  margin-top: 50;
`;

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
    NavigationActions.navigate({ routeName: 'BackupWallet' }),
  ],
});

@connect()
class CreateWallet extends Component {
  state = {
    password: '',
    confirmedPassword: '',
    agreed: true,
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onConfirmedPasswordChange = (confirmedPassword) => {
    this.setState({ confirmedPassword });
  }

  onAgreementChange = (agreed) => {
    this.setState({ agreed });
  }

  onCreateButtonPress = () => {
    const { dispatch, navigation } = this.props;
    const { password } = this.state;
    const id = uuid();
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedHex(mnemonic);

    dispatch(createWallet({
      id, password, seed, mnemonic,
    }));
    navigation.dispatch(resetAction);
  }

  isValid = () => {
    const { password, confirmedPassword, agreed } = this.state;

    return password.trim() &&
      password === confirmedPassword &&
      agreed;
  }

  render() {
    const { agreed } = this.state;

    return (
      <Container>
        <WarningSection />
        <FormSection>
          <PasswordInput placeholder="请输入密码" onChange={this.onPasswordChange} />
          <PasswordInput placeholder="请再次输入密码" onChange={this.onConfirmedPasswordChange} />
          <Agreement checked={agreed} onChange={this.onAgreementChange} />
          <CreateButton title="完成" onPress={this.onCreateButtonPress} disabled={!this.isValid()} />
        </FormSection>
      </Container>
    );
  }
}

export default CreateWallet;
