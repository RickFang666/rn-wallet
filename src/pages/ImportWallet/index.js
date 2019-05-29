import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import uuid from 'uuid/v4';
import { mnemonicToSeedHex, validateMnemonic } from 'bip39';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import { PasswordInput } from '../../components/Form';
import Button from '../../components/Button';
import Agreement from '../../components/Agreement';
import WarningMessage from '../../components/WarningMessage';
import { importWallet } from '../../reducers/wallets';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  flex: 1;
  background: #FFFFFF;
`;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

const MnemonicWords = styled.TextInput.attrs({
  multiline: true,
  placeholderTextColor: 'rgba(51, 51, 51, 0.3)',
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
})`
  font-size: 16;
  margin-top: 20;
  margin-bottom: 20;
  margin-left: 20;
  margin-right: 20;
  padding-top: 15;
  padding-bottom: 15;
  padding-left: 20;
  padding-right: 20; 
  background: rgba(187, 187, 187, 0.2);
  min-height: 110;
`;

const FormSection = styled.View`
  flex: 1;
  padding-left: 20;
  padding-right: 20;
`;

const ImportButton = styled(Button)`
  margin-top: 50;
`;

@connect()
class ImportWallet extends Component {
  state = {
    mnemonic: '',
    password: '',
    confirmedPassword: '',
    agreed: true,
  }

  onMnemonicWordsChange = (mnemonic) => {
    this.setState({ mnemonic });
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

  onImportButtonPress = () => {
    const { dispatch, navigation } = this.props;
    const { mnemonic, password } = this.state;

    if (validateMnemonic(mnemonic)) {
      const id = uuid();
      const seed = mnemonicToSeedHex(mnemonic);

      dispatch(importWallet({ id, seed, password }));
      navigation.dispatch(resetAction);
    } else {
      this.warning.show();
    }
  }

  isValid = () => {
    const {
      mnemonic, password, confirmedPassword, agreed,
    } = this.state;

    return mnemonic.trim() &&
      password.trim() &&
      password === confirmedPassword &&
      agreed;
  }

  render() {
    const { agreed } = this.state;

    return (
      <Container>
        <MnemonicWords placeholder="输入助记词，按空格分隔" onChangeText={this.onMnemonicWordsChange} />
        <FormSection>
          <PasswordInput placeholder="请输入密码" onChange={this.onPasswordChange} />
          <PasswordInput placeholder="请再次输入密码" onChange={this.onConfirmedPasswordChange} />
          <Agreement checked={agreed} onChange={this.onAgreementChange} />
          <ImportButton title="完成" onPress={this.onImportButtonPress} disabled={!this.isValid()} />
        </FormSection>
        <WarningMessage message="无效助记词" ref={(ref) => { this.warning = ref; }} />
      </Container>
    );
  }
}

export default ImportWallet;
