import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import { Market } from '@project-serum/serum';
import BN from 'bn.js';

export default function SwapSOL({ selectedWallet, network }) {
    const [fromToken, setFromToken] = useState('SOL');
    const [toToken, setToToken] = useState('USDC');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [market, setMarket] = useState(null);

    useEffect(() => {
        const loadMarket = async () => {
            const connection = new Connection(network, 'confirmed');
            const marketAddress = new PublicKey('9wFFmU7Kz9jFqzJNr8URugYDJaw8FqPbxTcnYjJQU5mF'); // SOL/USDC market address on Serum DEX
            const market = await Market.load(
                connection, 
                marketAddress, 
                {}, 
                new PublicKey('9xQeWvG816bUx9EPGXSuxpyJdhXenKH8NpdDXP1mSYu8') // Serum DEX program ID
            );
            setMarket(market);
        };
        loadMarket();
    }, [network]);

    const swapTokens = async () => {
        if (!market) {
            setMessage('Market not loaded.');
            return;
        }

        const connection = new Connection(network, 'confirmed');

        const fromPublicKey = new PublicKey(selectedWallet.publicKey);
        const toPublicKey = await getAssociatedTokenAddress(
            new PublicKey('8X8SiaJYYQaGip1qFdeh3cC5vYxVDWRDZTpmRXKiHFwh'), // USDC token address
            fromPublicKey,
            false,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const fromTokenAmount = parseFloat(amount) * 1e9; // Convert SOL to lamports

        // Create the transaction
        const transaction = new Transaction();

        // Serum DEX swap logic here
        const swapInstruction = market.makePlaceOrderInstruction(connection, {
            owner: fromPublicKey,
            payer: fromPublicKey, // This is where the funds are coming from
            side: 'buy', // or 'sell' depending on the direction of the swap
            price: new BN(1), // Placeholder: set your desired price or market price
            size: new BN(fromTokenAmount), // Placeholder: set the amount to swap
            orderType: 'limit', // or 'ioc', 'postOnly', etc.
            clientId: new BN(Date.now()), // Client ID (can be unique per transaction)
            selfTradeBehavior: 'abortTransaction',
        });

        transaction.add(swapInstruction);

        transaction.feePayer = fromPublicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        try {
            const signedTransaction = await connection.signTransaction(transaction, [selectedWallet.secretKey]);

            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            await connection.confirmTransaction(signature);
            setMessage('Swap successful: ' + signature);
        } catch (error) {
            console.error(error);
            setMessage('Swap failed');
        }
    };

    return (
        <div>
            <h2>Swap Tokens</h2>
            <div>
                <label>From:</label>
                <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
                    <option value="SOL">SOL</option>
                </select>
            </div>
            <div>
                <label>To:</label>
                <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
                    <option value="USDC">USDC</option>
                </select>
            </div>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={swapTokens}>Swap</button>
            {message && <p>{message}</p>}
        </div>
    );
}
