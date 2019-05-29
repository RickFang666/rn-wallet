import React from 'react';
import styled from 'styled-components/native';
import supportedCoinTypes from '../../supportedCoinTypes';

const Logo = styled.Image`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

const LOGO = {
  [supportedCoinTypes.trio.name]: require('./trio.png'),
  [supportedCoinTypes.btc.name]: require('./btc.png'),
  [supportedCoinTypes.eth.name]: require('./eth.png'),
};

export default ({ coinType, size, style }) => (
  <Logo source={LOGO[coinType]} size={size} style={style} />
);
