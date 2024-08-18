# Anand's Web Wallet

Anand's Web Wallet is a simple and intuitive web-based wallet for managing Solana (SOL) assets. This project allows users to create and manage multiple Solana wallets, send and receive SOL, and switch between different Solana networks.

**Note**: The swap functionality is currently under development and is not yet available.

## Features

- **Create Wallets**: Generate new Solana wallets with a secure seed phrase.
- **Login**: Access your wallets using your seed phrase.
- **Send SOL**: Transfer SOL tokens to other Solana addresses.
- **Receive SOL**: Display your wallet's public key for receiving SOL.
- **Network Switching**: Switch between Mainnet, Devnet, and Testnet networks.
- **Swap Functionality**: *Under Development* (Code is commented out)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anandparkhi/anands-solana-wallet.git
2. Navigate to the project directory:
   cd solana-web-wallet
3. Install dependencies:
   npm install
4. Start the application:
   npm start
The application will be available at http://localhost:3000.

## Usage

### Create a New Wallet

1. Upon loading the application, you can create a new wallet by clicking the "Generate Seed Phrase" button.
2. The generated seed phrase will be displayed, and you can copy it for safekeeping.
3. Enter the number of wallets you want to generate and click "Create Wallets".
4. The wallet(s) will be added to the wallet list, and you'll be logged in automatically.

### Log in with an Existing Wallet

1. If you have an existing seed phrase, you can log in by entering it in the "Log In" section.
2. Specify the number of wallets you want to regenerate and click "Log In".
3. Your wallets will be regenerated, and you can start managing them immediately.

### Sending SOL

1. Select a wallet from your list.
2. Enter the recipient's address and the amount of SOL to send.
3. Click the "Send" button to complete the transaction.
4. After the transaction is successful, you can track it on Solscan.

### Receiving SOL

1. Select a wallet from your list.
2. The public key of your selected wallet will be displayed. Use this key to receive SOL from other wallets.

### Network Switching

1. You can switch between Solana Mainnet, Devnet, and Testnet using the dropdown menu at the top of the application.
2. All transactions and wallet actions will be executed on the selected network.

### Swap Functionality

The swap feature is currently under development and is not functional. The code related to the swap functionality is commented out in the project. Stay tuned for updates.

## Roadmap

- [ ] Implement and test the swap functionality between SOL and USDC.
- [ ] Add support for additional tokens and custom networks.
- [ ] Enhance UI/UX for a better user experience.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue on GitHub.

## License

This project is licensed under the MIT License.

## Contact

- **Author**: Anand Parkhi
- **LinkedIn**: [Anand Parkhi](https://www.linkedin.com/in/anandparkhi/)
- **GitHub**: [anandparkhi](https://github.com/anandparkhi)
- **X (formerly Twitter)**: [@anandparkhi11](https://x.com/anandparkhi11)
