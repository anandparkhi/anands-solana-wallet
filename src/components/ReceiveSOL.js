import React from 'react';

export default function ReceiveSOL({ selectedWallet }) {
    if (!selectedWallet) return null;

    return (
        <div>
            <h2>Receive SOL</h2>
            <p>Public Key:</p>
            <p>{selectedWallet.publicKey}</p>
        </div>
    );
}
