import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';

export default function CreateWallet({ addWallet, network }) {
    const [seedPhrase, setSeedPhrase] = useState('');
    const [error, setError] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);
    const [numWallets, setNumWallets] = useState(1);

    const generateSeedPhrase = () => {
        if (!isGenerated) {
            const mnemonic = bip39.generateMnemonic();
            setSeedPhrase(mnemonic);
            setIsGenerated(true);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(seedPhrase);
        alert('Seed phrase copied to clipboard');
    };

    const createWallets = async () => {
        try {
            const seed = await bip39.mnemonicToSeed(seedPhrase);
            const newWallets = [];

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

                newWallets.push(wallet);
            }

            console.log("New wallets created:", newWallets);
            addWallet(newWallets);
            setError('');
        } catch (e) {
            console.error("Error creating wallets:", e);
            setError('Failed to create wallets. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create Wallet</h2>
            <button onClick={generateSeedPhrase} disabled={isGenerated}>
                {isGenerated ? 'Seed Phrase Generated' : 'Generate Seed Phrase'}
            </button>
            {seedPhrase && (
                <>
                    <textarea
                        value={seedPhrase}
                        readOnly
                        rows="3"
                        style={{ width: '100%', marginTop: '10px' }}
                    />
                    <button onClick={copyToClipboard} style={{ marginTop: '10px' }}>
                        Copy Seed Phrase
                    </button>
                    <input
                        type="number"
                        value={numWallets}
                        onChange={(e) => setNumWallets(e.target.value)}
                        placeholder="Number of Wallets"
                        min="1"
                        style={{ marginTop: '10px' }}
                    />
                    <button onClick={createWallets} style={{ marginTop: '10px' }}>
                        Create Wallets
                    </button>
                </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
