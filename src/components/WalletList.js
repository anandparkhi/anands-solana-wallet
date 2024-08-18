import React from 'react';
import { FaClipboard } from 'react-icons/fa';

export default function WalletList({ wallets, setSelectedWallet }) {
    const copyToClipboard = (publicKey) => {
        navigator.clipboard.writeText(publicKey);
        alert('Address copied to clipboard');
    };

    return (
        <div className="wallet-list">
            <h2>Your Wallets</h2>
            {wallets.map((wallet, index) => (
                <div
                    key={index}
                    className="wallet-item"
                    onClick={() => setSelectedWallet(wallet)}
                >
                    <div className="wallet-address">
                        <span>{wallet.publicKey}</span>
                        <button
                            className="icon-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(wallet.publicKey);
                            }}
                        >
                            <FaClipboard />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
