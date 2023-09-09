import { Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import {
  mnemonicGenerate,
  decodeAddress,
  blake2AsHex,
  cryptoWaitReady,
} from "@polkadot/util-crypto";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { BehaviorSubject } from "rxjs";

export default class Key {
  _name: string;
  _keyring: Keyring;
  _pair = new BehaviorSubject(null);
  pair$ = this._pair.asObservable();

  constructor(name: string) {
    this._name = name; // For debugging.
    this._keyring = new Keyring();
  }

  name(): string {
    return this._name;
  }

  signer(): KeyringPair {
    return this._pair.value;
  }

  address(): string {
    return this._pair.value.address;
  }

  publicKey(): string {
    return u8aToHex(this._pair.value.publicKey);
  }

  async generateAccount(): Promise<string> {
    console.log(`Generating a wallet with ${this._name}`);
    const mnemonic = mnemonicGenerate(24);
    await this.loadAccount(this._name, mnemonic);
    return mnemonic;
  }

  importAccount(name: string, mnemonic: string): boolean {
    console.log(`Restoring a wallet with ${this._name}`);
    this.loadAccount(name, mnemonic);
    return !!this._pair.value.address;
  }

  sign(message: string) {
    return u8aToHex(this._pair.value.sign(stringToU8a(message)));
  }

  verify(message: string, signature: string, address: string): boolean {
    const public_key = u8aToHex(decodeAddress(address));
    return this._pair.value.verify(message, signature, public_key);
  }

  hash(data: string): string {
    return blake2AsHex(data);
  }

  getAccountAsJson(): string {
    return JSON.stringify(this._pair.value.toJson(this._pair.value.address));
  }

  /**
   * @private
   */
  async loadAccount(name, mnemonic) {
    await cryptoWaitReady();
    this._pair.next(
      this._keyring.addFromUri(mnemonic, { name: name }, "sr25519")
    );
  }
}
