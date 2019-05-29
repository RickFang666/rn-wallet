import { SIGN_IN_SUCCESS } from './account';

const initialState = {
  error: null,
  status: null,
};

export default (state = initialState, action = {}) => {
  if (action.error && action.payload) {
    return {
      error: action.error,
      status: action.payload.status,
    };
  } else if (action.type === SIGN_IN_SUCCESS) {
    return initialState;
  }

  return state;
};

export function isUnauthorized({ status }) {
  return status === 401;
}
