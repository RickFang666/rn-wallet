import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const CoinType = styled.Text`
  font-size: 15;
  color: #FFFFFF;
  margin-bottom: 12;
`;

const InterestRate = styled.Text`
  font-size: 22;
  font-weight: bold;
  line-height: 26;
  color: #CDA469;
`;

const Description = styled.Text`
  font-size: 12;
  line-height: 17;
  color: rgba(205, 164, 105, 0.5);
`;

export default ({ coinType, rate }) => (
  <Container>
    <CoinType>{ coinType }</CoinType>
    <InterestRate>{ `${(rate * 100).toFixed(2)}%` }</InterestRate>
    <Description>年化利息</Description>
  </Container>
);
