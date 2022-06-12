import constate from 'constate';
import { useEffect, useState } from 'react';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';

import { usePersistentState } from './usePersistentState';

function useWallet() {
  const [address, setAddress] = usePersistentState<string>(undefined, 'ADDRESS');
  const [publicKey, setPublicKey] = usePersistentState<string>(undefined, 'PUBLIC_KEY');
  const [phrase, setPhrase] = usePersistentState<string>(undefined, 'PHRASE');
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  let provider
  useEffect(() => {
    phrase && generateWalletFromPhrase(phrase);
  }, []);

  function generateWalletFromPhrase(phrase: string) {
    const wallet = ethers.Wallet.fromMnemonic(phrase);
    setPhrase(phrase);
    setWallet(wallet);
    setAddress(wallet.address);
    setPublicKey(wallet.publicKey);
    provider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

  }

  return {
    address,
    phrase,
    setPhrase,
    generateWalletFromPhrase,
    wallet,
    publicKey,
    provider
  };
}

const [WalletProvider, useWalletContext] = constate(useWallet);

export { useWalletContext, WalletProvider };
