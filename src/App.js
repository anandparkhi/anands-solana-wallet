import React, { useState, useEffect } from 'react';
import CreateWallet from './components/CreateWallet';
import WalletList from './components/WalletList';
import WalletActions from './components/WalletActions';
import SendSOL from './components/SendSOL';
import NetworkSwitcher from './components/NetworkSwitcher';
import Login from './components/Login';
import './styles.css';

function App({ onLogin, wallets: initialWallets = [], onSelectWallet }) {
    const [wallets, setWallets] = useState(initialWallets);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [network, setNetwork] = useState('https://mainnet.helius-rpc.com/?api-key=917721d6-f275-4859-9988-588baaec88db');
    const [action, setAction] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (wallets.length > 0) {
            console.log("Wallets updated in App.js:", wallets);
            setIsLoggedIn(true);
            setSelectedWallet(wallets[0]);
        }
    }, [wallets]);

    const addWallet = (newWallets) => {
        setWallets((prevWallets) => [...prevWallets, ...newWallets]);
        if (onLogin) {
            onLogin([...wallets, ...newWallets]);
        }
    };

const handleLogout = () => {
    setWallets([]); 
    setSelectedWallet(null);
    setIsLoggedIn(false);
    setAction('');
};


    const handleWalletSelect = (wallet) => {
        setSelectedWallet(wallet);
        if (onSelectWallet) {
            onSelectWallet(wallet);
        }
    };

    return (
        <div className="container">
            <h1>Anand's Web Wallet</h1>
            <NetworkSwitcher setNetwork={setNetwork} />
            {isLoggedIn ? (
                <>
                    <WalletList wallets={wallets} setSelectedWallet={handleWalletSelect} />
                    <WalletActions
                        selectedWallet={selectedWallet}
                        onSend={() => setAction('send')}
                        onReceive={() => setAction('receive')}
                    />
                    {action === 'send' && (
                        <SendSOL
                            wallets={wallets}
                            selectedWallet={selectedWallet}
                            setSelectedWallet={setSelectedWallet}
                            network={network}
                        />
                    )}
                    <button onClick={handleLogout} className="logout-button">
                        Log Out
                    </button>
                </>
            ) : (
                <>
                    <CreateWallet addWallet={addWallet} network={network} onLogin={addWallet} />
                    <Login onLogin={addWallet} network={network} />
                </>
            )}
        </div>
    );
}

export default App;
