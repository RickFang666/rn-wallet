import React, { Component } from 'react';
import styled from 'styled-components/native';
import Logo from '../../components/Logo';
import FormattedValue from '../../components/FormattedValue';

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgba(117, 117, 117, 0.2);
  border-radius: 6;
  padding-top: 18;
  padding-bottom: 18;
  padding-left: 12;
  padding-right: 12;
  margin-bottom: 10;
`;

const Type = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.Text`
  font-size: 16;
  color: #FFFFFF;
  margin-left: 12;
`;

const Right = styled.View`
  display: flex;
  align-items: center;
`;

const Balance = styled.Text`
  font-size: 16;
  color: #FFFFFF;
`;

const EstimatedValue = styled.Text`
  font-size: 13;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4;
`;

class CoinType extends Component {
  onPress = () => {
    const { onOpen, coinType } = this.props;

    onOpen(coinType);
  }

  render() {
    const {
      coinType, exchangeRate, balance,
    } = this.props;

    return (
      <Container onPress={this.onPress}>
        <Type>
          <Logo coinType={coinType} size={35} />
          <Name>{ coinType }</Name>
        </Type>
        <FormattedValue coinType={coinType} value={balance} unit={false}>
          {
            formattedValue => (
              <Right>
                <Balance>{ formattedValue }</Balance>
                <EstimatedValue>{ `≈¥${(formattedValue * exchangeRate[coinType]).toFixed(2)}` }</EstimatedValue>
              </Right>
            )
          }
        </FormattedValue>
      </Container>
    );
  }
}

export default CoinType;
