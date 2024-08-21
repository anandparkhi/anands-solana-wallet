import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Keypair } from '@solana/web3.js';
import './styles.css';

let wallets = [];  // Store wallets created or logged in by the user

// Define global wallet functions
window.customWebWallet = {
  connect: async function () {
    // Logic to log in or create wallets
    return new Promise((resolve) => {
      const handleLogin = (newWallets) => {
        wallets = newWallets;
        resolve(wallets);
      };

      // Trigger the login or creation flow in  app
      ReactDOM.render(<App onLogin={handleLogin} />, document.getElementById('root'));
    });
  },
  disconnect: async function (publicKey) {
    // Logic to disconnect a specific wallet
    wallets = wallets.filter((wallet) => wallet.publicKey !== publicKey);
    return;
  },
  getKeypair: function (publicKey) {
    // Retrieve the Keypair object associated with the provided public key
    const wallet = wallets.find((w) => w.publicKey === publicKey);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return Keypair.fromSecretKey(Uint8Array.from(wallet.secretKey));
  },
  promptUserToSelectWallet: async function () {
    // Let the user select a wallet and return the selected public key
    return new Promise((resolve) => {
      const handleSelectWallet = (selectedWallet) => {
        resolve(selectedWallet.publicKey);
      };

      ReactDOM.render(
        <App
          wallets={wallets}
          onSelectWallet={handleSelectWallet}
        />,
        document.getElementById('root')
      );
    });
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
