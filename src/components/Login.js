import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';

export default function Login({ onLogin, network }) {
    const [seedPhrase, setSeedPhrase] = useState('');
    const [error, setError] = useState('');
    const [numWallets, setNumWallets] = useState(1);
    const loginWithSeedPhrase = async () => {
    try {
        const seed = await bip39.mnemonicToSeed(seedPhrase);
        const regeneratedWallets = [];

        for (let i = 0; i < numWallets; i++) {
            const derivationPath = `m/44'/501'/${i}'/0'`;
            const derivedSeed = derivePath(derivationPath, seed.toString('hex')).key;
            const keypair = Keypair.fromSeed(derivedSeed);

            const wallet = {
                publicKey: keypair.publicKey.toString(),
                secretKey: Array.from(keypair.secretKey),
                network: network,
                accountIndex: i,
            };

            regeneratedWallets.push(wallet);
        }

        console.log("Regenerated wallets:", regeneratedWallets);
        onLogin(regeneratedWallets); // Overwrite the wallets state with the new wallets
        setError('');
    } catch (e) {
        console.error("Error during login:", e);
        setError('Invalid seed phrase. Please try again.');
    }
};
    return (
        <div>
            <h2>Log In</h2>
            <textarea
                placeholder="Enter Seed Phrase"
                value={seedPhrase}
                onChange={(e) => setSeedPhrase(e.target.value)}
                rows="3"
                style={{ width: '100%', marginTop: '10px' }}
            />
            <input
                type="number"
                value={numWallets}
                onChange={(e) => setNumWallets(e.target.value)}
                placeholder="Number of Wallets"
                min="1"
                style={{ marginTop: '10px' }}
            />
            <button onClick={loginWithSeedPhrase} style={{ marginTop: '10px' }}>
                Log In
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
