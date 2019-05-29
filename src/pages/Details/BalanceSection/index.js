import React from 'react';
import styled from 'styled-components/native';
import ContainerWithMargins from '../../../components/ContainerWithMargins';
import EyeButton from '../../../components/EyeButton';
import FormattedValue from '../../../components/FormattedValue';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  position: relative;
  padding-bottom: 30;
  padding-left: 45;
  padding-right: 45;
  background: #2A2A2A;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  right: 0;
  top: 0;
  width: 140;
  height: 170;
`;

const Top = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30;
`;

const Balance = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: #CDA469;
  margin-right: 10;
`;

const EstimatedValue = styled.Text`
  font-size: 18;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10;
`;

const BACKGROUND_IMAGE = {
  btc: require('./btc.png'),
  eth: require('./eth.png'),
  // trio: require('./trio.png'),
};

export default ({
  coinType, exchangeRate, balance, visible, onToggleVisibility,
}) => (
  <Container>
    <BackgroundImage source={BACKGROUND_IMAGE[coinType]} />
    <Top>
      <FormattedValue coinType={coinType} value={balance}>
        { formattedValue => <Balance>{ visible ? formattedValue : '******' }</Balance> }
      </FormattedValue>
      <EyeButton onChange={onToggleVisibility} secure={!visible} />
    </Top>
    <FormattedValue coinType={coinType} value={balance}>
      { formattedValue => <EstimatedValue>{ `≈¥${visible ? (formattedValue * exchangeRate[coinType]).toFixed(2) : '******'}` }</EstimatedValue> }
    </FormattedValue>
  </Container>
);
