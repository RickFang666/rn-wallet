import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTransaction } from '../../reducers';
import { fetchTransaction } from '../../reducers/wallets';
import Logo from '../../components/Logo';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import FormattedValue from '../../components/FormattedValue';
import { DEBUG } from '../../../config';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})``;

const Header = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30;
  padding-bottom: 30;
  background: #2A2A2A;
`;

const Value = styled.Text`
  font-size: 24;
  color: #CDA469;
  font-weight: bold;
  margin-top: 13;
`;

const Main = styled.View`
  padding-left: 30;
  padding-right: 30;
  padding-top: 35;
  padding-bottom: 15;
  margin-bottom: 10;
  background: #FFFFFF;
`;

const Entry = styled.View`
  margin-bottom: 20;
`;

const EntryLabel = styled.Text`
  font-size: 13;
  color: #BBBBBB;
`;

const EntryValue = styled.Text`
  font-size: 14;
  color: #333333;
  margin-top: 5;
`;

const HashTouchable = styled.TouchableOpacity`
  margin-top: 5;
`;

const Hash = styled.Text`
  font-size: 14;
  color: #CFAF81;
`;

const Fee = styled.Text`
  font-size: 14;
  color: #333333;
  margin-top: 5;
`;

const Footer = styled.View`
  padding-left: 30;
  padding-right: 30;
  padding-top: 35;
  padding-bottom: 15;
  margin-bottom: 10;
  background: #FFFFFF;
`;

function shortenHash(hash) {
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
}

function generateExternalUrl(coinType, hash) {
  switch (coinType) {
    case 'BTC':
      return `https://${DEBUG ? 'testnet.' : ''}blockchain.info/tx/${hash}`;
    default:
      return `https://etherscan.io/tx/0x${hash}`;
  }
}

const mapStateToProps = (state, props) => {
  const { coinType, hash, address } = props.navigation.state.params;

  return {
    coinType,
    hash,
    address,
    transaction: getTransaction(state),
  };
};

@connect(mapStateToProps)
class Transaction extends Component {
  componentDidMount() {
    const {
      coinType, hash, address, dispatch,
    } = this.props;

    dispatch(fetchTransaction(coinType, hash, address));
  }

  onHashPress = () => {
    const { coinType, hash, navigation } = this.props;

    navigation.navigate('Web', { url: generateExternalUrl(coinType, hash) });
  }

  render() {
    const {
      coinType, hash, transaction: {
        input, output, value, fee, timeStamp,
      },
    } = this.props;

    return (
      <Container>
        <ScrollView>
          <Header>
            <Logo coinType={coinType} size={60} />
            <FormattedValue value={value} coinType={coinType} unit>
              {
                formattedValue => <Value>{formattedValue}</Value>
              }
            </FormattedValue>
          </Header>
          <Main>
            <Entry>
              <EntryLabel>转账方</EntryLabel>
              <EntryValue>{ input }</EntryValue>
            </Entry>
            <Entry>
              <EntryLabel>收款方</EntryLabel>
              <EntryValue>{ output }</EntryValue>
            </Entry>
            <Entry>
              <EntryLabel>矿工费用</EntryLabel>
              <FormattedValue value={fee} coinType={coinType} unit>
                {
                  formattedValue => <Fee>{ formattedValue }</Fee>
                }
              </FormattedValue>
            </Entry>
          </Main>
          <Footer>
            <Entry>
              <EntryLabel>交易号</EntryLabel>
              <HashTouchable onPress={this.onHashPress}>
                <Hash>{ shortenHash(hash) }</Hash>
              </HashTouchable>
            </Entry>
            <Entry>
              <EntryLabel>交易时间</EntryLabel>
              <EntryValue>{ moment(timeStamp).format('YYYY-MM-DD HH:mm') }</EntryValue>
            </Entry>
          </Footer>
        </ScrollView>
      </Container>
    );
  }
}

export default Transaction;
