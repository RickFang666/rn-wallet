import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import AddressInput from './AddressInput';
import Scan from './Scan';
import AmountInput from './AmountInput';
import isAddressValid from '../../utils/isAddressValid';
import normalizeAddress from '../../utils/normalizeAddress';
import ConfirmationModal from '../../components/TransferConfirmationModal';
import FeeSelector from '../../components/FeeSelector';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import WarningMessage from '../../components/WarningMessage';
import FormattedValue, { denormalizeValue } from '../../components/FormattedValue';
import Button from '../../components/Button';
import Wallet from '../../utils/Wallet';
import {
  getFees,
  getBalance,
  getCurrentWallet,
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
  padding-bottom: 20;
  padding-left: 20;
  padding-right: 20;
  background: #FFFFFF;
`;

const Unit = styled.Text`
  font-size: 16;
  color: rgba(51, 51, 51, 0.6);
`;

const Description = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10;
`;

const Total = styled.Text`
  font-size: 14;
  color: rgba(51, 51, 51, 0.3);
`;

const TransferAllButton = styled.TouchableOpacity``;

const TransferAllLabel = styled.Text`
  font-size: 14;
  color: #CFAF81;  
`;

const TransferButton = styled(Button)`
  margin-top: 60;
`;

const mapStateToProps = (state, props) => {
  const { coinType } = props.navigation.state.params;

  return {
    coinType,
    balance: getBalance(coinType, state),
    fees: getFees(coinType, state),
    wallet: getCurrentWallet(state),
  };
};

@connect(mapStateToProps)
class Transfer extends PureComponent {
  state = {
    address: '',
    amount: 0,
    rawAmount: '',
    feePreference: 0,
    fee: 0,
    isConfirmationModalVisible: false,
  }

  componentDidMount() {
    const { coinType } = this.props;

    this.props.dispatch(fetchFees(coinType));
  }

  onTransferAll = rawAmount => () =>
    this.setState({ amount: this.props.balance.balance, rawAmount })

  onTransferPress = () => {
    const { coinType, balance } = this.props;
    const { address, feePreference, amount } = this.state;
    if (isAddressValid(coinType, address)) {
      initializeTransaction({
        coinType,
        feePreference,
        input: balance.address,
        output: normalizeAddress(coinType, address),
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
    } else {
      this.addressWarning.show();
    }
  }

  onAddressScanned = (address) => {
    const { coinType } = this.props;

    if (isAddressValid(coinType, address)) {
      this.setState({ address: normalizeAddress(coinType, address) });
    } else {
      this.addressWarning.show();
    }
  }

  onScanPress = () => {
    this.props.navigation.navigate('AddressScanner', { onRead: this.onAddressScanned });
  }

  onAddressChange = address => this.setState({ address })

  onAmountChange = (rawAmount) => {
    const { coinType } = this.props;
    this.setState({ amount: denormalizeValue(coinType, rawAmount), rawAmount });
  }

  onFeeChange = feePreference => this.setState({ feePreference })

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
    const { coinType, balance: { balance }, fees } = this.props;
    const {
      address, amount, rawAmount, fee,
    } = this.state;

    return (
      <Container>
        <AddressInput value={address} onChange={this.onAddressChange}>
          <Scan onPress={this.onScanPress} />
        </AddressInput>
        <AmountInput value={rawAmount} onChange={this.onAmountChange}>
          <Unit>{ coinType }</Unit>
        </AmountInput>
        <FormattedValue coinType={coinType} value={balance}>
          { formattedValue => (
            <Description>
              <Total>{ `可用数量为${formattedValue}，` }</Total>
              <TransferAllButton onPress={this.onTransferAll(formattedValue)}>
                <TransferAllLabel>全部转出</TransferAllLabel>
              </TransferAllButton>
            </Description>
          ) }
        </FormattedValue>
        <FeeSelector
          coinType={coinType}
          high={fees.high}
          medium={fees.medium}
          low={fees.low}
          onChange={this.onFeeChange}
        />
        <TransferButton title="转出" onPress={this.onTransferPress} />
        <ConfirmationModal
          coinType={coinType}
          address={address}
          amount={amount}
          fee={fee}
          isVisible={this.state.isConfirmationModalVisible}
          confirm={this.onConfirm}
          close={this.closeModal}
        />
        <WarningMessage message="无效地址" ref={(ref) => { this.addressWarning = ref; }} />
        <WarningMessage message="钱包密码错误" ref={(ref) => { this.passwordWarning = ref; }} />
        <WarningMessage message="余额不足" ref={(ref) => { this.balanceWarning = ref; }} />
      </Container>
    );
  }
}

export default Transfer;
