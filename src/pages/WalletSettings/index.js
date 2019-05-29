import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ConfirmationModal from './ConfirmationModal';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import WarningMessage from '../../components/WarningMessage';
import { Entries, Entry, Divider } from '../../components/Settings';
import Wallet from '../../utils/Wallet';
import { getCurrentWallet } from '../../reducers';
import { deleteWallet } from '../../reducers/wallets';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
  hasBottom: true,
})`
  display: flex;
  flex: 1;
  background: #F2F2F2;
`;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

const mapStateToProps = state => ({
  wallet: getCurrentWallet(state),
});

@connect(mapStateToProps)
class WalletSettings extends Component {
  state = {
    isConfirmModalVisible: false,
  }

  onDeleteWalletPress = () => {
    this.setState({ isConfirmModalVisible: true });
  }

  onBackupWalletPress = () => {
    this.props.navigation.navigate('BackupWallet');
  }

  onDeleteWalletConfirmPress = (password) => {
    const { wallet } = this.props;

    this.setState({ isConfirmModalVisible: false });
    if (wallet.password) {
      if (wallet.password === password) {
        this.deleteWallet();
      } else {
        this.warning.show();
      }
    } else {
      const seed = Wallet.decryptSeed(wallet.encryptedSeed, password);
      try {
        new Wallet(seed); // eslint-disable-line no-new
        this.deleteWallet();
      } catch (error) {
        this.warning.show();
      }
    }
  }

  deleteWallet = () => {
    const { dispatch, navigation } = this.props;

    dispatch(deleteWallet());
    navigation.dispatch(resetAction);
  }

  closeModal = () => {
    this.setState({ isConfirmModalVisible: false });
  }

  render() {
    const { wallet } = this.props;
    const { isConfirmModalVisible } = this.state;

    return (
      <Container>
        <Entries>
          {
            wallet && wallet.password &&
            [
              <Entry title="备份钱包" onPress={this.onBackupWalletPress} chevron />,
              <Divider />,
            ]
          }
          <Entry title="删除钱包" onPress={this.onDeleteWalletPress} chevron />
        </Entries>
        <ConfirmationModal
          title="验证身份"
          isVisible={isConfirmModalVisible}
          onConfirm={this.onDeleteWalletConfirmPress}
          onClose={this.closeModal}
        />
        <WarningMessage message="钱包密码错误" ref={(ref) => { this.warning = ref; }} />
      </Container>
    );
  }
}

export default WalletSettings;
