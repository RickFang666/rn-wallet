import React, { Component } from 'react';
import { Clipboard } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import PurchaseByWallet from './PurchaseByWallet';
import PurchaseByQRCode from './PurchaseByQRCode';
import CreateWalletModal from './CreateWalletModal';
import Tabs, { Tab } from '../../components/Tabs';
import ConfirmationModal from '../../components/TransferConfirmationModal';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import WarningMessage from '../../components/WarningMessage';
import Wallet from '../../utils/Wallet';
import {
  getCurrentWallet,
  getBalance,
  getFees,
} from '../../reducers';
import {
  fetchFees,
  initializeTransaction,
  sendSignedTransaction,
} from '../../reducers/wallets';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  display: flex;
  flex: 1;
  background: #F2F2F2;
`;

const TYPES = {
  WALLET: 'WALLET',
  QRCODE: 'QRCODE',
};

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
    NavigationActions.navigate({ routeName: 'CreateWallet' }),
  ],
});

const mapStateToProps = (state, props) => {
  const { coinType, address } = props.navigation.state.params;

  return {
    coinType,
    address,
    wallet: getCurrentWallet(state),
    balance: getBalance(coinType, state),
    fees: getFees(coinType, state),
  };
};

@connect(mapStateToProps)
class Purchase extends Component {
  state = {
    type: this.props.wallet ? TYPES.WALLET : TYPES.QRCODE,
    amount: 0,
    fee: 0,
    feePreference: 1,
    isConfirmationModalVisible: false,
  }

  componentDidMount() {
    const { coinType, dispatch } = this.props;

    dispatch(fetchFees(coinType));
  }

  onCopyToClipboard = () => {
    const { address } = this.props;

    Clipboard.setString(address);
  }

  onWalletTabPress = () => {
    this.setState({ type: TYPES.WALLET });
  }

  onQRCodeTabPress = () => {
    this.setState({ type: TYPES.QRCODE });
  }

  onAmountChange = amount => this.setState({ amount })

  onFeePreferenceChange = feePreference => this.setState({ feePreference })

  onPurchasePress = () => {
    const { coinType, balance, address } = this.props;
    const { feePreference, amount } = this.state;

    initializeTransaction({
      coinType,
      feePreference,
      input: balance.address,
      output: address,
      amount: parseFloat(amount),
    })
      .then((transaction) => {
        if (transaction.errors) {
          this.balanceWarning.show();
          this.setState({ isConfirmationModalVisible: false });
        } else {
          this.transactionToSign = transaction;
          this.setState({ fee: transaction.tx.fees, isConfirmationModalVisible: true });
        }
      });
  }

  onConfirm = (password) => {
    const { coinType, wallet } = this.props;

    this.setState({ isConfirmationModalVisible: false });
    if (wallet.password) {
      if (wallet.password === password) {
        const signedTransaction = (new Wallet(wallet.seed)).sign(this.transactionToSign, coinType);
        this.sendSignedTransaction(signedTransaction);
      } else {
        this.passwordWarning.show();
      }
    } else {
      try {
        const seed = Wallet.decryptSeed(wallet.encryptedSeed, password);
        const signedTransaction = (new Wallet(seed)).sign(this.transactionToSign, coinType);
        this.sendSignedTransaction(signedTransaction);
      } catch (error) {
        this.passwordWarning.show();
      }
    }
  }

  onCreateWalletPress = () => {
    this.props.navigation.dispatch(resetAction);
  }

  sendSignedTransaction = (signedTransaction) => {
    const { coinType } = this.props;

    sendSignedTransaction(coinType, signedTransaction)
      .then(() => {
        this.props.navigation.goBack();
      });
  }

  closeModal = () => {
    this.setState({ isConfirmationModalVisible: false });
  }

  render() {
    const {
      coinType, address, wallet, balance, fees,
    } = this.props;
    const {
      type, amount, fee, isConfirmationModalVisible,
    } = this.state;

    return (
      <Container>
        {
          wallet &&
            <Tabs>
              <Tab title="钱包转入" active={type === TYPES.WALLET} onPress={this.onWalletTabPress} />
              <Tab title="二维码转入" active={type === TYPES.QRCODE} onPress={this.onQRCodeTabPress} />
            </Tabs>
        }
        {
          type === TYPES.WALLET ?
            <PurchaseByWallet
              coinType={coinType}
              address={address}
              balance={balance.balance}
              fees={fees}
              onAmountChange={this.onAmountChange}
              onFeePreferenceChange={this.onFeePreferenceChange}
              onPurchasePress={this.onPurchasePress}
            /> :
            <PurchaseByQRCode
              coinType={coinType}
              address={address}
              onCopyToClipboard={this.onCopyToClipboard}
            />
        }
        <ConfirmationModal
          coinType={coinType}
          address={address}
          amount={amount}
          fee={fee}
          isVisible={isConfirmationModalVisible}
          confirm={this.onConfirm}
          close={this.closeModal}
        />
        <CreateWalletModal
          isVisible={!wallet}
          onConfirm={this.onCreateWalletPress}
        />
        <WarningMessage message="钱包密码错误" ref={(ref) => { this.passwordWarning = ref; }} />
        <WarningMessage message="余额不足" ref={(ref) => { this.balanceWarning = ref; }} />
      </Container>
    );
  }
}

export default Purchase;
