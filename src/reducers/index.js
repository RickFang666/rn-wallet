import { combineReducers } from 'redux';
import accountReducer, * as accountSelectors from './account';
import walletReducer, * as walletSelectors from './wallets';
import bankReducer, * as bankSelectors from './bank';
import addressBookReducer, * as addressBookSelectors from './addressBook';
import systemReducer, * as systemSelectors from './system';
import errorReducer, * as errorSelectors from './error';

const rootReducer = combineReducers({
  account: accountReducer,
  wallets: walletReducer,
  bank: bankReducer,
  addressBook: addressBookReducer,
  system: systemReducer,
  error: errorReducer,
});

export default rootReducer;

export function isSignedIn({ account }) {
  return accountSelectors.isSignedIn(account);
}

export function hasTradingPassword({ account }) {
  return accountSelectors.hasTradingPassword(account);
}

export function getRegisterationInformation({ account }) {
  return accountSelectors.getRegisterationInformation(account);
}

export function getAccountInformation({ account }) {
  return accountSelectors.getAccountInformation(account);
}

export function getCoinTypes({ wallets }) {
  return walletSelectors.getCoinTypes(wallets);
}

export function getBalance(coinType, { wallets }) {
  return walletSelectors.getBalance(coinType, wallets);
}

export function getTransactions(coinType, { wallets }) {
  return walletSelectors.getTransactions(coinType, wallets);
}

export function getTransaction({ wallets }) {
  return walletSelectors.getTransaction(wallets);
}

export function getExchangeRate({ wallets }) {
  return walletSelectors.getExchangeRate(wallets);
}

export function getProduct(coinType, { bank }) {
  return bankSelectors.getProduct(coinType, bank);
}

export function getProducts({ bank }) {
  return bankSelectors.getProducts(bank);
}

export function getPurchasedProduct(coinType, { bank }) {
  return bankSelectors.getPurchasedProduct(coinType, bank);
}

export function getPurchasedProducts({ bank }) {
  return bankSelectors.getPurchasedProducts(bank);
}

export function getPurchaseRecords(coinType, { bank }) {
  return bankSelectors.getPurchaseRecords(coinType, bank);
}

export function isForeground({ system }) {
  return systemSelectors.isForeground(system);
}

export function isAssetVisible({ system }) {
  return systemSelectors.isAssetVisible(system);
}

export function isBankVisible({ system }) {
  return systemSelectors.isBankVisible(system);
}

export function getAddressBookCoinTypes({ addressBook }) {
  return addressBookSelectors.getAddressBookCoinTypes(addressBook);
}

export function getAddresses(coinType, { addressBook }) {
  return addressBookSelectors.getAddresses(coinType, addressBook);
}

export function getCurrentWallet({ wallets }) {
  return walletSelectors.getCurrentWallet(wallets);
}

export function getFees(coinType, { wallets }) {
  return walletSelectors.getFees(coinType, wallets);
}

export function isUnauthorized({ error }) {
  return errorSelectors.isUnauthorized(error);
}
