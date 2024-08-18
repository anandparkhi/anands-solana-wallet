import React from 'react';

export default function NetworkSwitcher({ setNetwork }) {
    const handleNetworkChange = (e) => {
        setNetwork(e.target.value);
    };

    return (
        <div className="network-switcher">
            <select onChange={handleNetworkChange}>
                <option value="https://api.mainnet-beta.solana.com">Mainnet</option>
                <option value="https://api.devnet.solana.com">Devnet</option>
                <option value="https://api.testnet.solana.com">Testnet</option>
            </select>
        </div>
    );
}
