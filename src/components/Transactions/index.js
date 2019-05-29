import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import Transaction from './Transaction';

const Container = styled.ScrollView`
  display: flex;
  flex: 1;
  background: #FFFFFF;
`;

const Title = styled.Text`
  margin-left: 20;
  padding-top: 25;
  font-size: 12;
  color: #999999;
`;

export default class Transactions extends Component {
  state = {
    refreshing: false,
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.refreshTransactions().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    const {
      coinType, onTransactionPress, transactions, address,
    } = this.props;

    return (
      <Container refreshControl={
        <RefreshControl
          tintColor="#000000"
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      }
      >
        <Title>最近交易记录</Title>
        {
          transactions
            .map(transaction => (
              <Transaction
                key={transaction.hash}
                coinType={coinType}
                address={address}
                onPress={onTransactionPress}
                {...transaction}
              />
            ))
        }
      </Container>
    );
  }
}
