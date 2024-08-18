import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js';

export default function SendSOL({ wallets, selectedWallet, setSelectedWallet, network }) {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (selectedWallet) {
            const fetchBalance = async () => {
                const connection = new Connection(network, 'confirmed');
                const balance = await connection.getBalance(new PublicKey(selectedWallet.publicKey));
                setBalance(balance / 1e9); // Convert lamports to SOL
            };
            fetchBalance();
        }
    }, [selectedWallet, network]);

    const sendTransaction = async () => {
        const connection = new Connection(network, 'confirmed');
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(selectedWallet.publicKey),
                toPubkey: new PublicKey(recipient),
                lamports: parseFloat(amount) * 1e9, // Convert SOL to lamports
            })
        );

        transaction.feePayer = new PublicKey(selectedWallet.publicKey);
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        const keypair = Keypair.fromSecretKey(Uint8Array.from(selectedWallet.secretKey));
        transaction.sign(keypair);

        try {
            const signature = await connection.sendRawTransaction(transaction.serialize());
            await connection.confirmTransaction(signature);

            const solscanLink = `https://solscan.io/tx/${signature}?cluster=${network.includes('devnet') ? 'devnet' : network.includes('testnet') ? 'testnet' : 'mainnet-beta'}`;
            setMessage(
                <>
                    <div style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                        Transaction successful!
                    </div>
                    <div>
                        <a href={solscanLink} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>
                            Track your transaction on Solscan
                        </a>
                    </div>
                </>
            );
        } catch (error) {
            console.error(error);
            setMessage(
                <div style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
                    Transaction failed. Please try again.
                </div>
            );
        }
    };

    return (
        <div>
            <h2>Send SOL</h2>
            {wallets.length > 1 && (
                <select
                    value={selectedWallet.publicKey}
                    onChange={(e) => {
                        const selected = wallets.find(wallet => wallet.publicKey === e.target.value);
                        setSelectedWallet(selected);
                    }}
                >
                    {wallets.map((wallet, index) => (
                        <option key={index} value={wallet.publicKey}>
                            {wallet.publicKey}
                        </option>
                    ))}
                </select>
            )}
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="number"
                    placeholder="Amount in SOL"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    className="max-button"
                    onClick={() => setAmount(balance.toString())}
                >
                    Max
                </button>
            </div>
            <button onClick={sendTransaction}>Send</button>
            {message && <div className="message">{message}</div>}
        </div>
    );
}
