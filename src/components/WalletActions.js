import React from 'react';
import { FaPaperPlane, FaDownload, FaExchangeAlt } from 'react-icons/fa';

export default function WalletActions({
    selectedWallet,
    onSend,
    onReceive,
    onSwap,
}) {
    if (!selectedWallet) return null;

    return (
        <div className="send-receive-swap">
            <div className="action-icon" onClick={onSend}>
                <FaPaperPlane />
                <span>Send</span>
            </div>
            <div className="action-icon" onClick={onReceive}>
                <FaDownload />
                <span>Receive</span>
            </div>
            {/* <div className="action-icon" onClick={onSwap}>
                <FaExchangeAlt />
                <span>Swap</span>
            </div> */}
        </div>
    );
}
