import ICAP from 'ethereumjs-icap';
import { DEBUG } from '../../config';

export function getIbanBody(address) {
  return address.replace('iban:', '').replace(/\?.*$/, '');
}

export function isValidEthAddress(address) {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

export function isValidEthIbanAddress(address) {
  return ICAP.isAddress(getIbanBody(address));
}

export function isValidBtcAddress(address) {
  return DEBUG ?
    /^[2mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address) :
    /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address);
}

export default function isAddressValid(coinType, address) {
  if (coinType === 'ETH') {
    return isValidEthAddress(address) || isValidEthIbanAddress(address);
  } else if (coinType === 'BTC') {
    return isValidBtcAddress(address);
  }
  return false;
}
