import React, { useState } from 'react';
import CreateWallet from './components/CreateWallet';
import WalletList from './components/WalletList';
import WalletActions from './components/WalletActions';
import SendSOL from './components/SendSOL';
import SwapSOL from './components/SwapSOL';
import NetworkSwitcher from './components/NetworkSwitcher';
import Login from './components/Login';
import './styles.css';

function App() {
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [network, setNetwork] = useState('https://mainnet.helius-rpc.com/?api-key=917721d6-f275-4859-9988-588baaec88db');
    const [action, setAction] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const addWallet = (newWallets) => {
        setWallets((prevWallets) => [...prevWallets, ...newWallets]);
    };

    const handleLogin = (wallets) => {
        setWallets(wallets);
        setSelectedWallet(wallets[0]);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setSelectedWallet(null);
        setIsLoggedIn(false);
        setAction('');
    };

    return (
        <div className="container">
            <h1>Anand's Web Wallet</h1>
            <NetworkSwitcher setNetwork={setNetwork} />
            {isLoggedIn ? (
                <>
                    <WalletList wallets={wallets} setSelectedWallet={setSelectedWallet} />
                    <WalletActions
                        selectedWallet={selectedWallet}
                        onSend={() => setAction('send')}
                        onReceive={() => setAction('receive')}
                        // onSwap={() => setAction('swap')}
                    />
                    {action === 'send' && <SendSOL wallets={wallets} selectedWallet={selectedWallet} setSelectedWallet={setSelectedWallet} network={network} />}
                    {/* {action === 'swap' && <SwapSOL selectedWallet={selectedWallet} network={network} />} */}
                    <button onClick={handleLogout} className="logout-button">
                        Log Out
                    </button>
                </>
            ) : (
                <>
                    <CreateWallet addWallet={addWallet} network={network} onLogin={handleLogin} />
                    <Login onLogin={handleLogin} network={network} />
                </>
            )}
        </div>
    );
}

export default App;
