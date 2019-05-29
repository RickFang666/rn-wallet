import React from 'react';
import styled from 'styled-components/native';
import Logo from '../../components/Logo';
import ContainerWithMargins from '../../components/ContainerWithMargins';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  background: #2A2A2A;
`;

const Top = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 15;
  padding-bottom: 35;
  padding-left: 30;
  padding-right: 30;
`;

const Total = styled.View`
  margin-left: 20;
`;

const TotalBalance = styled.Text`
  font-size: 20;
  font-weight: bold;
  color: #CDA469;
  margin-bottom: 5;
`;

const TotalEstimatedValue = styled.Text`
  font-size: 12;
  font-weight: bold;
  color: rgba(205, 164, 105, 0.5);
  margin-bottom: 5;  
`;

const Bottom = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 20;
`;

const Balance = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 5;
  padding-bottom: 5;
`;

const BalanceTitle = styled.Text`
  font-size: 12;
  color: rgba(187, 187, 187, 0.5);
  margin-bottom: 5;
`;

const BalanceValue = styled.Text`
  font-size: 16;
  color: #FFFFFF;
`;

const Divider = styled.View`
  height: 35;
  border-width: 1;
  border-color: rgba(231, 231, 231, 0.1);
`;

export default ({
  coinType, balance, frozenBalance, exchangeRate,
}) => (
  <Container>
    <Top>
      <Logo coinType={coinType} size={60} />
      <Total>
        <TotalBalance>{ balance + frozenBalance }</TotalBalance>
        <TotalEstimatedValue>{ `≈¥${((balance + frozenBalance) * exchangeRate[coinType]).toFixed(2)}` }</TotalEstimatedValue>
      </Total>
    </Top>
    <Bottom>
      <Balance>
        <BalanceTitle>可用数量(个)</BalanceTitle>
        <BalanceValue>{ balance }</BalanceValue>
      </Balance>
      <Divider />
      <Balance>
        <BalanceTitle>冻结数量(个)</BalanceTitle>
        <BalanceValue>{ frozenBalance }</BalanceValue>
      </Balance>
    </Bottom>
  </Container>
);
