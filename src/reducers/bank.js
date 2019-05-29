import { RSAA } from 'redux-api-middleware';
import Stomp from '@stomp/stompjs';
import moment from 'moment';
import { LOG_OUT_REQUEST } from './account';
import encryptPassword from '../utils/encryptPassword';
import config from '../../config';

const {
  PRODUCTS_API_URL,
  EXCHANGE_API_URL,
  EXCHANGE_WEBSOCKET_URL,
} = config;

const FETCH_PRODUCTS_REQUEST = '@trio/FETCH_PRODUCTS_REQUEST';
const FETCH_PRODUCTS_SUCCESS = '@trio/FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = '@trio/FETCH_PRODUCTS_FAILURE';

const FETCH_PURCHASED_PRODUCTS_REQUEST = '@trio/FETCH_PURCHASED_PRODUCTS_REQUEST';
const FETCH_PURCHASED_PRODUCTS_SUCCESS = '@trio/FETCH_PURCHASED_PRODUCTS_SUCCESS';
const FETCH_PURCHASED_PRODUCTS_FAILURE = '@trio/FETCH_PURCHASED_PRODUCTS_FAILURE';

const FETCH_PURCHASE_RECORDS_REQUEST = '@trio/FETCH_PURCHASE_RECORDS_REQUEST';
const FETCH_PURCHASE_RECORDS_SUCCESS = '@trio/FETCH_PURCHASE_RECORDS_SUCCESS';
const FETCH_PURCHASE_RECORDS_FAILURE = '@trio/FETCH_PURCHASE_RECORDS_FAILURE';

export const WITHDRAW_REQUEST = '@trio/WITHDRAW_REQUEST';
const WITHDRAW_SUCCESS = '@trio/WITHDRAW_SUCCESS';
const WITHDRAW_FAILURE = '@trio/WITHDRAW_FAILURE';

const initialState = {
  details: [],
  list: [],
  transactions: {},
};

let websocketClient;

function normalizeTransactions(payload, address, coinType) {
  switch (coinType) {
    case 'BTC':
      return (payload.data.list || []).map((raw) => {
        const input = raw.inputs[0];
        const output = raw.outputs.find(item => item.addresses[0] !== input.prev_addresses[0]);
        return {
          hash: raw.hash,
          from: input.prev_addresses[0],
          to: output.addresses[0],
          timeStamp: moment(raw.time).valueOf(),
          value: address === input.prev_addresses[0] ? input.prev_value : output.value,
          fee: raw.fee,
          confirmed: raw.confirmations >= 6,
        };
      });
    case 'ETH':
      return payload.result.map(raw => ({
        hash: raw.hash,
        from: raw.from,
        to: raw.to,
        timeStamp: raw.timeStamp * 1000,
        value: raw.value,
        fee: raw.gasPrice * raw.gasUsed,
        confirmed: raw.confirmations >= 6,
      }));
    default:
      return [];
  }
}

export function unsubscribeToCoinTypes() {
  if (websocketClient) {
    websocketClient.disconnect();
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        details: action.payload.products,
      };
    case FETCH_PURCHASED_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
      };
    case FETCH_PURCHASE_RECORDS_SUCCESS: {
      const { coinType, address } = action.meta;
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [coinType]: normalizeTransactions(action.payload, address, coinType),
        },
      };
    }
    case LOG_OUT_REQUEST: {
      unsubscribeToCoinTypes();
      return initialState;
    }
    default:
      return state;
  }
};

export function getProducts({ details }) {
  return details || [];
}

export function getProduct(coinType, { details }) {
  return details.find(item => item.currency === coinType);
}

export function getPurchasedProducts({ list }) {
  return list || [];
}

export function getPurchasedProduct(coinType, { list }) {
  return list.find(item => item.currency === coinType);
}

export function getPurchaseRecords(coinType, { transactions }) {
  return transactions[coinType] || [];
}

export function getPurchaseRecord(coinType, hash, state) {
  return getPurchaseRecords(coinType, state).find(item => item.hash === hash);
}

export function fetchProducts() {
  return {
    [RSAA]: {
      endpoint: `${PRODUCTS_API_URL}`,
      method: 'GET',
      types: [
        FETCH_PRODUCTS_REQUEST,
        FETCH_PRODUCTS_SUCCESS,
        FETCH_PRODUCTS_FAILURE,
      ],
    },
  };
}

export function fetchPurchasedProducts() {
  return {
    [RSAA]: {
      endpoint: `${EXCHANGE_API_URL}/wallets`,
      method: 'GET',
      types: [
        FETCH_PURCHASED_PRODUCTS_REQUEST,
        FETCH_PURCHASED_PRODUCTS_SUCCESS,
        FETCH_PURCHASED_PRODUCTS_FAILURE,
      ],
    },
  };
}

export function fetchPurchaseRecords(coinType, address) {
  return {
    [RSAA]: {
      endpoint: `${EXCHANGE_API_URL}/wallets/${coinType}/addrs/${address}`,
      method: 'GET',
      types: [
        FETCH_PURCHASE_RECORDS_REQUEST,
        {
          type: FETCH_PURCHASE_RECORDS_SUCCESS,
          meta: () => ({ coinType, address }),
        },
        FETCH_PURCHASE_RECORDS_FAILURE,
      ],
    },
  };
}

export function withdraw(coinType, address, amount, tradingPassword) {
  const form = new FormData();
  form.append('currency', coinType);
  form.append('address', address);
  form.append('quantity', amount);
  form.append('txPassword', encryptPassword(tradingPassword));
  return {
    [RSAA]: {
      endpoint: `${EXCHANGE_API_URL}/withdrawals`,
      method: 'POST',
      body: form,
      types: [
        WITHDRAW_REQUEST,
        WITHDRAW_SUCCESS,
        WITHDRAW_FAILURE,
      ],
    },
  };
}

export function subscribeToBank() {
  return (dispatch) => {
    websocketClient = Stomp.client(EXCHANGE_WEBSOCKET_URL);
    websocketClient.connect('', '', () => {
      websocketClient.subscribe('/user/queue/wallets', (message) => {
        dispatch({
          type: FETCH_PURCHASED_PRODUCTS_SUCCESS,
          payload: { data: JSON.parse(message.body) },
        });
      });
    });
  };
}

