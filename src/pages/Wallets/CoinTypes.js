import React from 'react';
import CoinType from './CoinType';

export default ({ coinTypes, exchangeRate, onCoinTypePress }) =>
  Object.keys(coinTypes).map(coinType => (
    <CoinType
      key={coinType}
      onOpen={onCoinTypePress}
      coinType={coinType}
      exchangeRate={exchangeRate}
      balance={coinTypes[coinType].balance}
      estimatedValue={0}
    />
  ));
