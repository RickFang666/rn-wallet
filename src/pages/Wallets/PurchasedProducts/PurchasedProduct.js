import React from 'react';
import styled from 'styled-components/native';

const Frame = styled.View`
  display: flex;
  flex: 1;
  padding-left: 5;
  padding-right: 5;
`;

const Container = styled.TouchableOpacity`
  justify-content: center;
  background: rgba(117, 117, 117, 0.2);
  border-radius: 6;
  height: 110;
  padding-left: 20;
  padding-right: 20;
`;

const CoinType = styled.Text`
  font-size: 15;
  color: #FFFFFF;
  margin-bottom: 15;
`;

const Balance = styled.Text`
  font-size: 17;
  font-weight: bold;
  line-height: 20;
  color: #CDA469;
`;

const EstimatedValue = styled.Text`
  font-size: 12;
  line-height: 17;
  color: rgba(205, 164, 105, 0.5);
`;

export default ({
  currency, balance, exchangeRate, onPress,
}) => (
  <Frame>
    <Container onPress={() => onPress(currency)}>
      <CoinType>{ currency }</CoinType>
      <Balance>{ balance }</Balance>
      <EstimatedValue>{ `≈¥${(balance * exchangeRate[currency]).toFixed(2)}` }</EstimatedValue>
    </Container>
  </Frame>
);
