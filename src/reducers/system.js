import { FOREGROUND, BACKGROUND } from 'redux-enhancer-react-native-appstate';

const TOGGLE_ASSET_VISIBILITY = '@trio/TOGGLE_ASSET_VISIBILITY';

const TOGGLE_BANK_VISIBILITY = '@trio/TOGGLE_BANK_VISIBILITY';

const initialState = {
  isForeground: true,
  isAssetVisible: true,
  isBankVisible: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_ASSET_VISIBILITY:
      return {
        ...state,
        isAssetVisible: !state.isAssetVisible,
      };
    case TOGGLE_BANK_VISIBILITY:
      return {
        ...state,
        isBankVisible: action.payload.status,
      };
    case FOREGROUND:
      return {
        ...state,
        isForeground: true,
      };
    case BACKGROUND:
      return {
        ...state,
        isForeground: false,
      };
    default:
      return state;
  }
};

export function toggleAssetVisibility() {
  return {
    type: TOGGLE_ASSET_VISIBILITY,
  };
}

export function setBankVisibility(status) {
  return {
    type: TOGGLE_BANK_VISIBILITY,
    payload: { status },
  };
}

export function isForeground(state) {
  return state.isForeground;
}

export function isAssetVisible(state) {
  return state.isAssetVisible;
}

export function isBankVisible(state) {
  return state.isBankVisible;
}
