import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import BalanceSection from './BalanceSection';
import WithdrawButton from './WithdrawButton';
import PurchaseButton from './PurchaseButton';
import ProductDetails from './ProductDetails';
import Transactions from '../../components/Transactions';
import {
  getProduct,
  getPurchasedProduct,
  getExchangeRate,
  getPurchaseRecords,
} from '../../reducers';
import { fetchPurchaseRecords } from '../../reducers/bank';

const Container = styled.View`
  flex: 1;
  padding-bottom: 50;
`;

const Buttons = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const mapStateToProps = (state, props) => {
  const { coinType } = props.navigation.state.params;

  return {
    coinType,
    details: getProduct(coinType, state),
    product: getPurchasedProduct(coinType, state),
    exchangeRate: getExchangeRate(state),
    records: getPurchaseRecords(coinType, state),
  };
};

@connect(mapStateToProps)
class Product extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.coinType}资产`,
  });

  componentDidMount() {
    this.refreshPurchaseRecords();
  }

  onPurchaseButtonPress = () => {
    const { coinType, product } = this.props;

    this.props.navigation.navigate('Purchase', { coinType, address: product.address });
  }

  onWithdrawButtonPress = () => {
    const { coinType, product } = this.props;

    this.props.navigation.navigate('Withdraw', { coinType, address: product.address });
  }

  refreshPurchaseRecords = () => {
    const { coinType, product } = this.props;

    this.props.dispatch(fetchPurchaseRecords(coinType, product.address));
  }

  hasPurchaseRecords = () => {
    const { records } = this.props;

    return !!records.length;
  }

  render() {
    const {
      coinType, product, details, exchangeRate, records,
    } = this.props;

    return (
      <Container>
        <BalanceSection coinType={coinType} exchangeRate={exchangeRate} {...product} />
        {
          this.hasPurchaseRecords() ?
            <Transactions
              coinType={coinType}
              address={product.address}
              transactions={records}
              onTransactionPress={this.onRecordPress}
              refreshTransactions={this.refreshPurchaseRecords}
            /> :
            <ProductDetails {...details} />
        }
        <Buttons>
          {
            this.hasPurchaseRecords() &&
              <WithdrawButton onPress={this.onWithdrawButtonPress} />
          }
          <PurchaseButton onPress={this.onPurchaseButtonPress} />
        </Buttons>
      </Container>
    );
  }
}

export default Product;
