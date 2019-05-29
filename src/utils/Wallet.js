import bitcoin from 'bitcoinjs-lib';
import ethUtil from 'ethereumjs-util';
import CryptoJS from 'crypto-js';
import { DEBUG, COIN_TYPES } from '../../config';

const BITCOIN_PATH = DEBUG ? "m/44'/1'/0'/0/0" : "m/44'/0'/0'/0/0";
const ETHEREUM_PATH = "m/44'/60'/0'/0/0";

export default class Wallet {
  static encryptSeed(seed, key) {
    return CryptoJS.AES.encrypt(seed, key).toString();
  }

  static decryptSeed(cipherText, key) {
    return CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
  }

  constructor(seed) {
    this.root = bitcoin.HDNode.fromSeedHex(
      seed,
      DEBUG ? bitcoin.networks.testnet : bitcoin.networks.bitcoin,
    );
  }

  getAddress(coinType) {
    switch (coinType) {
      case COIN_TYPES.BTC:
        return this.getBitcoinAddress();
      case COIN_TYPES.ETH:
        return this.getEthereumAddress();
      default:
        throw new Error('Invalid Coin Type');
    }
  }

  getBitcoinAddress() {
    return this.root.derivePath(BITCOIN_PATH).getAddress();
  }

  getEthereumAddress() {
    const key = this.root.derivePath(ETHEREUM_PATH);

    const privKeyBuffer = key.keyPair.d.toBuffer(32);
    const addressBuffer = ethUtil.privateToAddress(privKeyBuffer);
    const hexAddress = addressBuffer.toString('hex');
    const checksumAddress = ethUtil.toChecksumAddress(hexAddress);

    return ethUtil.addHexPrefix(checksumAddress);
  }

  sign(transaction, coinType) {
    const path = coinType === COIN_TYPES.BTC ? BITCOIN_PATH : ETHEREUM_PATH;
    const key = this.root.derivePath(path);
    const signatures = transaction.tosign.map(tosign => key.keyPair.sign(Buffer.from(tosign, 'hex')).toDER().toString('hex'));
    const pubkeys = transaction.tosign.map(() => key.keyPair.getPublicKeyBuffer().toString('hex'));

    return {
      signatures,
      pubkeys,
      ...transaction,
    };
  }
}
