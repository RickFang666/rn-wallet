import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import BalanceSection from './BalanceSection';
import ReceiveButton from './ReceiveButton';
import TransferButton from './TransferButton';
import Transactions from '../../components/Transactions';
import {
  getBalance,
  getExchangeRate,
  getTransactions,
  isAssetVisible,
} from '../../reducers';
import { fetchTransactions } from '../../reducers/wallets';
import { toggleAssetVisibility } from '../../reducers/system';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  background: #2A2A2A;
`;

const Buttons = styled.View`
  display: flex;
  flex-direction: row;
`;


const mapStateToProps = (state, props) => {
  const { coinType } = props.navigation.state.params;

  return {
    coinType,
    exchangeRate: getExchangeRate(state),
    balance: getBalance(coinType, state),
    transactions: getTransactions(coinType, state),
    isTotalAssetVisible: isAssetVisible(state),
  };
};

@connect(mapStateToProps)
class Details extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.coinType,
  });

  componentDidMount() {
    this.refreshTransactions();
  }

  onTransactionPress = (coinType, hash, address) => {
    this.props.navigation.navigate('Transaction', { coinType, hash, address });
  }

  onReceivePress = () => {
    const { coinType, balance: { address } } = this.props;

    this.props.navigation.navigate('Receive', { coinType, address });
  }

  onTransferPress = () => {
    this.props.navigation.navigate('Transfer', { coinType: this.props.coinType });
  }

  onToggleVisibility = () => {
    this.props.dispatch(toggleAssetVisibility());
  }

  refreshTransactions = () => {
    const { dispatch, coinType, balance: { address } } = this.props;

    return dispatch(fetchTransactions(coinType, address));
  }

  render() {
    const {
      coinType,
      exchangeRate,
      balance: { balance, address },
      transactions,
      isTotalAssetVisible,
    } = this.props;

    return (
      <Container>
        <BalanceSection
          coinType={coinType}
          exchangeRate={exchangeRate}
          balance={balance}
          estimatedValue={0}
          onToggleVisibility={this.onToggleVisibility}
          visible={isTotalAssetVisible}
        />
        <Transactions
          coinType={coinType}
          address={address}
          transactions={transactions}
          onTransactionPress={this.onTransactionPress}
          refreshTransactions={this.refreshTransactions}
        />
        <Buttons>
          <ReceiveButton onPress={this.onReceivePress} />
          <TransferButton onPress={this.onTransferPress} />
        </Buttons>
      </Container>
    );
  }
}

export default Details;
