import { RSAA } from 'redux-api-middleware';
import Wallet from '../utils/Wallet';
import * as blockcypher from '../utils/blockcypher';
import { COIN_TYPES } from '../../config';

const CREATE_WALLET = '@trio/CREATE_WALLET';

const BACKUP_WALLET = '@trio/BACKUP_WALLET';

const DELETE_WALLET = '@trio/DELETE_WALLET';

const FETCH_BALANCE_REQUEST = '@trio/FETCH_BALANCE_REQUEST';
const FETCH_BALANCE_SUCCESS = '@trio/FETCH_BALANCE_SUCCESS';
const FETCH_BALANCE_FAILURE = '@trio/FETCH_BALANCE_FAILURE';

const FETCH_TRANSACTIONS_REQUEST = '@trio/FETCH_TRANSACTIONS_REQUEST';
const FETCH_TRANSACTIONS_SUCCESS = '@trio/FETCH_TRANSACTIONS_SUCCESS';
const FETCH_TRANSACTIONS_FAILURE = '@trio/FETCH_TRANSACTIONS_FAILURE';

const FETCH_TRANSACTION_REQUEST = '@trio/FETCH_TRANSACTION_REQUEST';
const FETCH_TRANSACTION_SUCCESS = '@trio/FETCH_TRANSACTION_SUCCESS';
const FETCH_TRANSACTION_FAILURE = '@trio/FETCH_TRANSACTION_FAILURE';

const FETCH_FEES_REQUEST = '@trio/FETCH_FEES_REQUEST';
const FETCH_FEES_SUCCESS = '@trio/FETCH_FEES_SUCCESS';
const FETCH_FEES_FAILURE = '@trio/FETCH_FEES_FAILURE';

const FETCH_EXCHANGE_RATE_REQUEST = '@trio/FETCH_EXCHANGE_RATE_REQUEST';
const FETCH_EXCHANGE_RATE_SUCCESS = '@trio/FETCH_EXCHANGE_RATE_SUCCESS';
const FETCH_EXCHANGE_RATE_FAILURE = '@trio/FETCH_EXCHANGE_RATE_FAILURE';

const initialState = {
  // defined as array for multiple wallets in the next version
  list: [],
  coinTypes: {},
  transactions: {},
  transaction: {},
  price: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_WALLET:
    case BACKUP_WALLET:
      return {
        ...state,
        list: [action.payload],
      };
    case DELETE_WALLET:
      return initialState;
    case FETCH_BALANCE_SUCCESS:
      return {
        ...state,
        coinTypes: {
          ...state.coinTypes,
          [action.payload.coinType]: action.payload,
        },
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.coinType]: action.payload.transactions,
        },
      };
    case FETCH_TRANSACTION_REQUEST:
      return {
        ...state,
        transaction: initialState.transaction,
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.payload,
      };
    case FETCH_FEES_SUCCESS:
      return {
        ...state,
        fees: {
          ...state.fees,
          [action.payload.coinType]: action.payload.fees,
        },
      };
    case FETCH_EXCHANGE_RATE_SUCCESS:
      return {
        ...state,
        price: {
          BTC: (1 / action.payload.BTC),
          ETH: (1 / action.payload.ETH),
        },
      };
    default:
      return state;
  }
};

export function createWallet(options) {
  const {
    id, seed, password, mnemonic,
  } = options;

  const wallet = new Wallet(seed);
  const addresses = {};
  Object.keys(COIN_TYPES).forEach((coinType) => {
    addresses[coinType] = wallet.getAddress(coinType);
  });
  return {
    type: CREATE_WALLET,
    payload: {
      id,
      name: 'default',
      seed,
      mnemonic,
      password,
      addresses,
    },
  };
}

export function backupWallet(wallet) {
  const {
    id, name, seed, password, addresses,
  } = wallet;

  return {
    type: BACKUP_WALLET,
    payload: {
      id,
      name,
      encryptedSeed: Wallet.encryptSeed(seed, password),
      addresses,
    },
  };
}

export function importWallet(options) {
  const { id, seed, password } = options;

  const wallet = new Wallet(seed);
  const addresses = {};
  Object.keys(COIN_TYPES).forEach((coinType) => {
    addresses[coinType] = wallet.getAddress(coinType);
  });
  return {
    type: CREATE_WALLET,
    payload: {
      id,
      name: 'default',
      encryptedSeed: Wallet.encryptSeed(seed, password),
      addresses,
    },
  };
}

export function getCurrentWallet({ list }) {
  return list[0];
}

export function getCoinTypes({ coinTypes }) {
  return coinTypes || {};
}

export function getBalance(coinType, { coinTypes }) {
  return coinTypes[coinType];
}

export function getTransactions(coinType, { transactions }) {
  return (transactions && transactions[coinType]) || [];
}

export function getTransaction({ transaction }) {
  return transaction || {};
}

export function getExchangeRate({ price }) {
  return price || {};
}

export function getFees(coinType, { fees }) {
  return (fees && fees[coinType]) || {};
}

export function fetchTransactions(coinType, address) {
  return (dispatch) => {
    dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
    return blockcypher.fetchTransactions(coinType, address)
      .then(transactions =>
        dispatch({ type: FETCH_TRANSACTIONS_SUCCESS, payload: { coinType, transactions } }))
      .catch(() => dispatch({ type: FETCH_TRANSACTIONS_FAILURE }));
  };
}

export function fetchTransaction(coinType, hash, address) {
  return (dispatch) => {
    dispatch({ type: FETCH_TRANSACTION_REQUEST });
    return blockcypher.fetchTransaction(coinType, hash, address)
      .then((transaction) => {
        dispatch({ type: FETCH_TRANSACTION_SUCCESS, payload: transaction });
      })
      .catch(() => {
        dispatch({ type: FETCH_TRANSACTION_FAILURE });
      });
  };
}

export function fetchWalletByCoinType(coinType, wallet) {
  const address = wallet.addresses[coinType];

  return (dispatch) => {
    dispatch({ type: FETCH_BALANCE_REQUEST });
    return blockcypher.fetchBalance(coinType, address)
      .then((balance) => {
        dispatch({ type: FETCH_BALANCE_SUCCESS, payload: { coinType, balance, address } });
      })
      .catch(() => dispatch({ type: FETCH_BALANCE_FAILURE }));
  };
}

export function fetchWallet(wallet) {
  return (dispatch) => {
    const promises = Object.keys(COIN_TYPES).map(coinType =>
      dispatch(fetchWalletByCoinType(coinType, wallet)));
    return Promise.all(promises);
  };
}

export function subscribeToWallet(wallet) {
  return (dispatch) => {
    Object.keys(COIN_TYPES).forEach((coinType) => {
      const address = wallet.addresses[coinType];
      blockcypher.subscribeToAddress(coinType, address, () => {
        dispatch(fetchWalletByCoinType(coinType, wallet));
        dispatch(fetchTransactions(coinType, address));
      });
    });
  };
}

export function fetchExchangeRate() {
  return {
    [RSAA]: {
      endpoint: 'https://min-api.cryptocompare.com/data/price?fsym=CNY&tsyms=BTC,ETH',
      method: 'GET',
      types: [
        FETCH_EXCHANGE_RATE_REQUEST,
        FETCH_EXCHANGE_RATE_SUCCESS,
        FETCH_EXCHANGE_RATE_FAILURE,
      ],
    },
  };
}

export function fetchFees(coinType) {
  return (dispatch) => {
    dispatch({ type: FETCH_FEES_REQUEST });
    return blockcypher.fetchFees(coinType)
      .then(fees => dispatch({ type: FETCH_FEES_SUCCESS, payload: { coinType, fees } }))
      .catch(() => dispatch({ type: FETCH_FEES_FAILURE }));
  };
}

export function initializeTransaction({
  coinType, input, output, feePreference, amount,
}) {
  return blockcypher.createTransaction({
    coinType, input, output, feePreference, amount,
  });
}

export function sendSignedTransaction(coinType, signedTransaction) {
  return blockcypher.sendTransaction(coinType, signedTransaction);
}

export function deleteWallet() {
  return {
    type: DELETE_WALLET,
  };
}
