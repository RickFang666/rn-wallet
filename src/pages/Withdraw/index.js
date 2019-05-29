import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import AddressInput from './AddressInput';
import Scan from './Scan';
import AmountInput from './AmountInput';
import isAddressValid from '../../utils/isAddressValid';
import normalizeAddress from '../../utils/normalizeAddress';
import ConfirmationModal from '../../components/TransferConfirmationModal';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import WarningMessage from '../../components/WarningMessage';
import { normalizeValue, denormalizeValue } from '../../components/FormattedValue';
import Button from '../../components/Button';
import {
  getCurrentWallet,
  getBalance,
  getPurchasedProduct,
} from '../../reducers';
import { withdraw } from '../../reducers/bank';

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

const WithdrawAllButton = styled.TouchableOpacity``;

const WithdrawAllLabel = styled.Text`
  font-size: 14;
  color: #CFAF81;  
`;

const WithdrawButton = styled(Button)`
  margin-top: 60;
`;

const mapStateToProps = (state, props) => {
  const { coinType } = props.navigation.state.params;

  return {
    coinType,
    product: getPurchasedProduct(coinType, state),
    wallet: getCurrentWallet(state),
    balance: getBalance(coinType, state),
  };
};

@connect(mapStateToProps)
class Withdraw extends PureComponent {
  state = {
    address: this.props.wallet ? this.props.balance.address : '',
    amount: 0,
    rawAmount: '',
    isConfirmationModalVisible: false,
  }

  onWithdrawAll = amount => () => this.setState({ amount })

  onWithdrawPress = () => {
    const { coinType, product } = this.props;
    const { address, amount } = this.state;

    if (!isAddressValid(coinType, address)) {
      this.addressWarning.show();
      return this.setState({ isConfirmationModalVisible: false });
    }

    if (denormalizeValue(coinType, product.balance) < amount) {
      this.balanceWarning.show();
      return this.setState({ isConfirmationModalVisible: false });
    }

    return this.setState({ isConfirmationModalVisible: true });
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

  onAmountChange = rawAmount =>
    this.setState({ amount: denormalizeValue(this.props.coinType, rawAmount), rawAmount })

  onConfirm = (password) => {
    const { coinType, dispatch, navigation } = this.props;
    const { address, amount } = this.state;

    dispatch(withdraw(coinType, address, normalizeValue(coinType, amount), password))
      .then((action) => {
        if (!action.error) {
          navigation.goBack();
        } else {
          this.balanceWarning.show();
          this.setState({ isConfirmationModalVisible: false });
        }
      });
  }

  closeModal = () => {
    this.setState({ isConfirmationModalVisible: false });
  }

  render() {
    const { coinType, product: { balance } } = this.props;
    const {
      address, amount, rawAmount,
    } = this.state;

    return (
      <Container>
        <AddressInput value={address} onChange={this.onAddressChange}>
          <Scan onPress={this.onScanPress} />
        </AddressInput>
        <AmountInput value={rawAmount} onChange={this.onAmountChange}>
          <Unit>{ coinType }</Unit>
        </AmountInput>
        <Description>
          <Total>{ `可用数量为${balance}，` }</Total>
          <WithdrawAllButton onPress={this.onWithdrawAll(denormalizeValue(coinType, balance))}>
            <WithdrawAllLabel>全部转出</WithdrawAllLabel>
          </WithdrawAllButton>
        </Description>
        <WithdrawButton title="转出" onPress={this.onWithdrawPress} />
        <ConfirmationModal
          coinType={coinType}
          address={address}
          amount={amount}
          isVisible={this.state.isConfirmationModalVisible}
          passwordType="trading"
          confirm={this.onConfirm}
          close={this.closeModal}
        />
        <WarningMessage message="无效地址" ref={(ref) => { this.addressWarning = ref; }} />
        <WarningMessage message="钱包密码错误" ref={(ref) => { this.passwordWarning = ref; }} />
        <WarningMessage message="转出失败" ref={(ref) => { this.balanceWarning = ref; }} />
      </Container>
    );
  }
}

export default Withdraw;
