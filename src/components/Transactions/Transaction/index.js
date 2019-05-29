import React, { Component } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import FormattedValue from '../../FormattedValue';

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 20;
  margin-right: 20;
  padding-top: 12;
  padding-bottom: 12;
  margin-top: 5;
  border-bottom-width: 1;
  border-bottom-color: #E7E7E7;
`;

const Icon = styled.Image`
  width: 28;
  height: 28;
  margin-right: 10;
`;

const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Group = styled.View``;

const Hash = styled.Text`
  font-size: 16;
  color: ${({ confirmed }) => (confirmed ? '#333333' : '#BBBBBB')};
`;

const Date = styled.Text`
  font-size: 13;
  color: #BBBBBB;
  margin-top: 5;
`;

const Right = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Value = styled.Text.attrs({
  hasSign: ({ hasSign }) => hasSign,
})`
  font-size: 16;
  color: ${({ confirmed, value }) => (confirmed ? (value > 0 ? '#CFAF81' : '#333333') : '#BBBBBB')};
`;

const TRANSACTION_TYPE = {
  in: require('./in.png'),
  out: require('./out.png'),
  pending: require('./pending.png'),
};

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

function getIconSource(value, confirmed) {
  return confirmed ?
    (value < 0 ? TRANSACTION_TYPE.out : TRANSACTION_TYPE.in) :
    TRANSACTION_TYPE.pending;
}

export default class Transaction extends Component {
  onPress = () => {
    const {
      hash, coinType, address, onPress,
    } = this.props;

    if (onPress) {
      onPress(coinType, hash, address);
    }
  }

  render() {
    const {
      coinType, hash, confirmed, timestamp, value,
    } = this.props;
    return (
      <Container onPress={this.onPress}>
        <Left>
          <Icon source={getIconSource(value, confirmed)} />
          <Group>
            <Hash confirmed={confirmed}>{ shortenAddress(hash) }</Hash>
            <Date>{ moment(timestamp).format('YYYY-MM-DD HH:mm') }</Date>
          </Group>
        </Left>
        <Right>
          <FormattedValue value={value} coinType={coinType}>
            {
              formattedValue => <Value confirmed={confirmed}>{ formattedValue }</Value>
            }
          </FormattedValue>
        </Right>
      </Container>
    );
  }
}
