import React from 'react';
import styled from 'styled-components/native';
import EyeButton from '../../components/EyeButton';
import { normalizeValue } from '../../components/FormattedValue';

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30;
  margin-bottom: 30;
`;

const Top = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: -40;
`;

const Label = styled.Text`
  font-size: 14;
  color: rgba(255, 255, 255, 0.6);
  margin-right: 12;
`;

const Amount = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 12;
`;

const Sign = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: #FFFFFF;
`;

const Value = styled.Text`
  font-size: 28;
  font-weight: bold;
  color: #FFFFFF;
`;

export default ({
  coinTypes, purchasedProducts, exchangeRate, visible, onToggle,
}) => {
  let totalAssets = Object.keys(coinTypes).reduce((result, coinType) =>
    result + (normalizeValue(coinType, coinTypes[coinType].balance) * exchangeRate[coinType]), 0);

  if (purchasedProducts) {
    totalAssets += purchasedProducts.reduce((result, product) =>
      result + (product.balance * exchangeRate[product.currency]), 0);
  }

  return (
    <Container>
      <Top>
        <Label>总资产</Label>
        <EyeButton onChange={onToggle} secure={!visible} />
      </Top>
      <Amount>
        <Sign>¥</Sign>
        <Value>{ visible ? totalAssets.toFixed(2) : '******' }</Value>
      </Amount>
    </Container>
  );
};
