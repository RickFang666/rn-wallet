const RATE = {
  BTC: 1e-8,
  ETH: 1e-18,
};

export function normalizeValue(coinType, value) {
  return parseFloat((value * RATE[coinType]).toPrecision(12));
}

export function denormalizeValue(coinType, value) {
  return parseFloat((value / RATE[coinType]).toPrecision(12));
}

export default ({
  value, coinType, unit, children,
}) => {
  const formattedValue = `${normalizeValue(coinType, value)} ${unit ? coinType : ''}`;

  return children(formattedValue);
};
