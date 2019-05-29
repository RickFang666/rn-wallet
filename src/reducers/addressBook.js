import { WITHDRAW_SUCCESS } from './bank';

const initialState = {};

export function getAddressBookCoinTypes(state) {
  return Object.keys(state);
}

export function getAddresses(coinType, state) {
  return state[coinType] || [];
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case WITHDRAW_SUCCESS: {
      const { currency, address } = action.payload;
      const addresses = getAddresses(currency, state);
      return {
        ...state,
        [currency]: addresses ? [...addresses, address] : [address],
      };
    }
    default:
      return state;
  }
};
