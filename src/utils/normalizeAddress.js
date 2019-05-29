import ICAP from 'ethereumjs-icap';
import {
  getIbanBody,
  isValidEthAddress,
  isValidEthIbanAddress,
  isValidBtcAddress,
} from './isAddressValid';

export default function normalizeAddress(coinType, address) {
  if (coinType === 'ETH') {
    if (isValidEthAddress(address)) {
      return address;
    } else if (isValidEthIbanAddress(address)) {
      return ICAP.toAddress(getIbanBody(address));
    }
  } else if (coinType === 'BTC') {
    if (isValidBtcAddress(address)) {
      return address;
    }
  }

  throw new Error('Invalid Address');
}
