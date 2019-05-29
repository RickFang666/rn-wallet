import moment from 'moment';
import { DEBUG, BLOCKCYPHER_TOKEN as TOKEN } from '../../config';

const API_BASE_URL = 'https://api.blockcypher.com/v1';

function getBlockPath(coinType) {
  switch (coinType) {
    case 'BTC':
      return DEBUG ? 'btc/test3' : 'btc/main';
    case 'ETH':
      return DEBUG ? 'beth/test' : 'eth/main';
    default:
      return `/${coinType.toLowerCase()}/main`;
  }
}

function normalizeTransaction(tx) {
  return {
    hash: tx.tx_hash,
    value: tx.tx_output_n >= 0 ? tx.value : tx.value * -1,
    confirmed: tx.confirmations >= 6,
    timestamp: moment(tx.confirmed).valueOf(),
  };
}

export function fetchTransactions(coinType, address) {
  return fetch(`${API_BASE_URL}/${getBlockPath(coinType)}/addrs/${address}?token=${TOKEN}`)
    .then(response => response.json())
    .then(data =>
      [].concat(data.unconfirmed_txrefs, data.txrefs)
        .filter(Boolean)
        .map(normalizeTransaction)
        .reduce((result, current) => {
          const previous = result.slice(-1)[0];

          if (previous && current.hash === previous.hash) {
            previous.value += current.value;
            return result;
          }
          return [...result, current];
        }, []));
}

export function fetchTransaction(coinType, hash, address) {
  return fetch(`${API_BASE_URL}/${getBlockPath(coinType)}/txs/${hash}?token=${TOKEN}`)
    .then(response => response.json())
    .then((data) => {
      const addressHash = address.replace('0x', '').toLowerCase();
      const input = data.inputs.find(i => i.addresses.find(a => a.toLowerCase() === addressHash));
      const output = data.outputs.find(i => i.addresses.find(a => a.toLowerCase() === addressHash));
      return ({
        ...normalizeTransaction(data),
        input: input ? input.addresses[0] : data.inputs[0].addresses[0],
        output: (output && !input) ? output.addresses[0] : data.outputs[0].addresses[0],
        fee: data.fees,
        value: (input || output).value || data.total,
      });
    });
}

export function fetchBalance(coinType, address) {
  return fetch(`${API_BASE_URL}/${getBlockPath(coinType)}/addrs/${address}/balance?token=${TOKEN}`)
    .then(response => response.json())
    .then(data => data.final_balance);
}

export function fetchFees(coinType) {
  return fetch(`${API_BASE_URL}/${getBlockPath(coinType)}?token=${TOKEN}`)
    .then(response => response.json())
    .then(data => ({
      high: data.high_fee_per_kb || data.high_gas_price,
      medium: data.medium_fee_per_kb || data.medium_gas_price,
      low: data.low_fee_per_kb || data.low_gas_price,
    }));
}

export function createTransaction({
  coinType, input, output, amount, feePreference,
}) {
  return fetch(`${API_BASE_URL}/${getBlockPath(coinType)}/txs/new?token=${TOKEN}`, {
    method: 'POST',
    body: JSON.stringify({
      inputs: [{ addresses: [input] }],
      outputs: [{ addresses: [output], value: amount }],
      preference: ['low', 'medium', 'high'][feePreference],
    }),
  })
    .then(response => response.json());
}

export function sendTransaction(coinType, signedTransaction) {
  return fetch(`${API_BASE_URL}/${getBlockPath(coinType)}/txs/send?token=${TOKEN}`, {
    method: 'POST',
    body: JSON.stringify(signedTransaction),
  }).then(response => response.json());
}

export function subscribeToAddress(coinType, address, callback) {
  const ws = new WebSocket(`wss://socket.blockcypher.com/v1/${getBlockPath(coinType)}`);

  ws.onmessage = event => callback(event.data);

  ws.onopen = () => {
    ws.send(JSON.stringify({
      event: 'unconfirmed-tx',
      address,
      token: TOKEN,
    }));
  };
}
