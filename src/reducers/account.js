import { RSAA } from 'redux-api-middleware';
import encryptPassword from '../utils/encryptPassword';
import config from '../../config';

const URL = config.EXCHANGE_API_URL;

const SIGN_IN_REQUEST = '@trio/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = '@trio/SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = '@trio/SIGN_IN_FAILURE';

const REGISTER_REQUEST = '@trio/REGISTER_REQUEST';
const REGISTER_SUCCESS = '@trio/REGISTER_SUCCESS';
const REGISTER_FAILURE = '@trio/REGISTER_FAILURE';

export const LOG_OUT_REQUEST = '@trio/LOG_OUT_REQUEST';
const LOG_OUT_SUCCESS = '@trio/LOG_OUT_SUCCESS';
const LOG_OUT_FAILURE = '@trio/LOG_OUT_FAILURE';

const FETCH_USER_INFORMATION_REQUEST = '@trio/FETCH_USER_INFORMATION_REQUEST';
const FETCH_USER_INFORMATION_SUCCESS = '@trio/FETCH_USER_INFORMATION_SUCCESS';
const FETCH_USER_INFORMATION_FAILURE = '@trio/FETCH_USER_INFORMATION_FAILURE';

const UPDATE_REGISTERATION_INFORMATION = '@trio/UPDATE_REGISTERATION_INFORMATION';

const SEND_VERIFICATION_CODE_BY_MAIL_REQUEST = '@trio/SEND_VERIFICATION_CODE_BY_MAIL_REQUEST';
const SEND_VERIFICATION_CODE_BY_MAIL_SUCCESS = '@trio/SEND_VERIFICATION_CODE_BY_MAIL_SUCCESS';
const SEND_VERIFICATION_CODE_BY_MAIL_FAILURE = '@trio/SEND_VERIFICATION_CODE_BY_MAIL_FAILURE';

const SEND_VERIFICATION_CODE_BY_PHONE_REQUEST = '@trio/SEND_VERIFICATION_CODE_BY_PHONE_REQUEST';
const SEND_VERIFICATION_CODE_BY_PHONE_SUCCESS = '@trio/SEND_VERIFICATION_CODE_BY_PHONE_SUCCESS';
const SEND_VERIFICATION_CODE_BY_PHONE_FAILURE = '@trio/SEND_VERIFICATION_CODE_BY_PHONE_FAILURE';

const CHANGE_PASSWORD_REQUEST = '@trio/CHANGE_PASSWORD_REQUEST';
const CHANGE_PASSWORD_SUCCESS = '@trio/CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_FAILURE = '@trio/CHANGE_PASSWORD_FAILURE';

const SET_TRADING_PASSWORD_REQUEST = '@trio/SET_TRADING_PASSWORD_REQUEST';
const SET_TRADING_PASSWORD_SUCCESS = '@trio/SET_TRADING_PASSWORD_SUCCESS';
const SET_TRADING_PASSWORD_FAILURE = '@trio/SET_TRADING_PASSWORD_FAILURE';

const CHANGE_TRADING_PASSWORD_REQUEST = '@trio/CHANGE_TRADING_PASSWORD_REQUEST';
const CHANGE_TRADING_PASSWORD_SUCCESS = '@trio/CHANGE_TRADING_PASSWORD_SUCCESS';
const CHANGE_TRADING_PASSWORD_FAILURE = '@trio/CHANGE_TRADING_PASSWORD_FAILURE';

const CHANGE_PHONE_NUMBER_REQUEST = '@trio/CHANGE_PHONE_NUMBER_REQUEST';
const CHANGE_PHONE_NUMBER_SUCCESS = '@trio/CHANGE_PHONE_NUMBER_SUCCESS';
const CHANGE_PHONE_NUMBER_FAILURE = '@trio/CHANGE_PHONE_NUMBER_FAILURE';

const CHANGE_EMAIL_REQUEST = '@trio/CHANGE_EMAIL_REQUEST';
const CHANGE_EMAIL_SUCCESS = '@trio/CHANGE_EMAIL_SUCCESS';
const CHANGE_EMAIL_FAILURE = '@trio/CHANGE_EMAIL_FAILURE';

const initialState = {
  hasTradingPassword: false,
  signedIn: false,
  signInFailded: false,
  registerFailded: false,
  registerationInformation: {},
  accountInformation: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        signedIn: false,
      };
    case SIGN_IN_SUCCESS:
    case FETCH_USER_INFORMATION_SUCCESS:
    case CHANGE_PHONE_NUMBER_SUCCESS:
    case CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        signedIn: true,
        accountInformation: action.payload.data,
        hasTradingPassword: !!action.payload.data.txPasswordStatus,
      };
    case LOG_OUT_REQUEST:
    case FETCH_USER_INFORMATION_FAILURE:
      return initialState;
    case UPDATE_REGISTERATION_INFORMATION:
      return {
        ...state,
        registerationInformation: {
          ...state.registerationINformation,
          ...action.payload,
        },
      };
    case SET_TRADING_PASSWORD_SUCCESS:
      return {
        ...state,
        hasTradingPassword: true,
      };
    default:
      return state;
  }
};

export function isSignedIn({ signedIn }) {
  return signedIn;
}

export function hasTradingPassword(state) {
  return state.hasTradingPassword;
}

export function getRegisterationInformation({ registerationInformation }) {
  return registerationInformation;
}

export function getAccountInformation({ accountInformation }) {
  return accountInformation;
}

export function signIn(username, password) {
  const form = new FormData();
  form.append('username', username);
  form.append('password', encryptPassword(password));
  form.append('secure', true);
  return {
    [RSAA]: {
      endpoint: `${URL}/login`,
      method: 'POST',
      body: form,
      types: [
        SIGN_IN_REQUEST,
        SIGN_IN_SUCCESS,
        SIGN_IN_FAILURE,
      ],
    },
  };
}

export function register({
  username, password, type, verificationCode,
}) {
  const form = new FormData();
  form.append('identity', username);
  form.append('password', encryptPassword(password));
  form.append('identityType', type);
  form.append('verifyCode', verificationCode);
  form.append('secure', true);
  return {
    [RSAA]: {
      endpoint: `${URL}/register`,
      method: 'POST',
      body: form,
      types: [
        REGISTER_REQUEST,
        REGISTER_SUCCESS,
        REGISTER_FAILURE,
      ],
    },
  };
}

export function logout() {
  return {
    [RSAA]: {
      endpoint: `${URL}/logout`,
      method: 'POST',
      types: [
        LOG_OUT_REQUEST,
        LOG_OUT_SUCCESS,
        LOG_OUT_FAILURE,
      ],
    },
  };
}

export function fetchAccountInformation() {
  return {
    [RSAA]: {
      endpoint: `${URL}/user`,
      method: 'GET',
      types: [
        FETCH_USER_INFORMATION_REQUEST,
        FETCH_USER_INFORMATION_SUCCESS,
        FETCH_USER_INFORMATION_FAILURE,
      ],
    },
  };
}

export function sendVerificationCodeByMail(address) {
  const form = new FormData();
  form.append('email', address);
  return {
    [RSAA]: {
      endpoint: `${URL}/verify/email`,
      method: 'POST',
      body: form,
      types: [
        SEND_VERIFICATION_CODE_BY_MAIL_REQUEST,
        SEND_VERIFICATION_CODE_BY_MAIL_SUCCESS,
        SEND_VERIFICATION_CODE_BY_MAIL_FAILURE,
      ],
    },
  };
}

export function sendVerificationCodeByPhone(phoneNumber) {
  const form = new FormData();
  form.append('phoneNumber', phoneNumber);
  return {
    [RSAA]: {
      endpoint: `${URL}/verify/sms`,
      method: 'POST',
      body: form,
      types: [
        SEND_VERIFICATION_CODE_BY_PHONE_REQUEST,
        SEND_VERIFICATION_CODE_BY_PHONE_SUCCESS,
        SEND_VERIFICATION_CODE_BY_PHONE_FAILURE,
      ],
    },
  };
}

export function updateRegisterationInformation(options) {
  return {
    type: UPDATE_REGISTERATION_INFORMATION,
    payload: options,
  };
}

export function changePassword(oldPassword, newPassword) {
  const form = new FormData();
  form.append('oldPassword', encryptPassword(oldPassword));
  form.append('newPassword', encryptPassword(newPassword));
  return {
    [RSAA]: {
      endpoint: `${URL}/user/password`,
      method: 'POST',
      body: form,
      types: [
        CHANGE_PASSWORD_REQUEST,
        CHANGE_PASSWORD_SUCCESS,
        CHANGE_PASSWORD_FAILURE,
      ],
    },
  };
}

export function setTradingPassword(password) {
  const form = new FormData();
  form.append('txPassword', encryptPassword(password));
  return {
    [RSAA]: {
      endpoint: `${URL}/txpassword`,
      method: 'POST',
      body: form,
      types: [
        SET_TRADING_PASSWORD_REQUEST,
        SET_TRADING_PASSWORD_SUCCESS,
        SET_TRADING_PASSWORD_FAILURE,
      ],
    },
  };
}

export function changeTradingPassword(oldPassword, newPassword) {
  const form = new FormData();
  form.append('oldTxPassword', encryptPassword(oldPassword));
  form.append('txPassword', encryptPassword(newPassword));
  return {
    [RSAA]: {
      endpoint: `${URL}/txpassword/update`,
      method: 'POST',
      body: form,
      types: [
        CHANGE_TRADING_PASSWORD_REQUEST,
        CHANGE_TRADING_PASSWORD_SUCCESS,
        CHANGE_TRADING_PASSWORD_FAILURE,
      ],
    },
  };
}

export function changePhoneNumber(phoneNumber, verificationCode, password) {
  const form = new FormData();
  form.append('mobile', phoneNumber);
  form.append('verifyCode', verificationCode);
  form.append('password', encryptPassword(password));
  return {
    [RSAA]: {
      endpoint: `${URL}/user`,
      method: 'POST',
      body: form,
      types: [
        CHANGE_PHONE_NUMBER_REQUEST,
        CHANGE_PHONE_NUMBER_SUCCESS,
        CHANGE_PHONE_NUMBER_FAILURE,
      ],
    },
  };
}

export function changeEmail(email, verificationCode, password) {
  const form = new FormData();
  form.append('email', email);
  form.append('verifyCode', verificationCode);
  form.append('password', encryptPassword(password));
  return {
    [RSAA]: {
      endpoint: `${URL}/user`,
      method: 'POST',
      body: form,
      types: [
        CHANGE_EMAIL_REQUEST,
        CHANGE_EMAIL_SUCCESS,
        CHANGE_EMAIL_FAILURE,
      ],
    },
  };
}
