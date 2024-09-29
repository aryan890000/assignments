
import '@fortawesome/fontawesome-free/css/all.min.css';

import { useState} from 'react';
import Web3 from 'web3';

interface AccountInfo {
  address: string;
  balance: string;
}

function ConnectToWallet() {
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const connectToWallet = async (): Promise<void> => {
    if (window.ethereum?.isMetaMask) {
      try {
        const web3 = new Web3(window.ethereum);
        const accountsList = await web3.eth.requestAccounts();
        console.log('Connected account:', accountsList[0]);

        const accountDetails: AccountInfo[] = await Promise.all(
          accountsList.map(async (account) => {
            const balanceInWei = await web3.eth.getBalance(account);
            const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
            return { address: account, balance: balanceInEth };
          })
        );
        setAccounts(accountDetails);
      } catch (error) {
        console.error('Error connecting to wallet or fetching balance', error);
      }
    } else {
      alert('MetaMask extension is not installed.');
    }
  };

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address); // Set the copied address
      setTimeout(() => setCopiedAddress(null), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to copy the address', error);
    }
  };



  return (
    <div>
      {accounts.length > 0 ? (
        <div>
          <h1>Account Details:</h1>
          {accounts.map((account, index) => (
            <div key={index}>
              <h3>
                Address: {account.address}
                <i
                  className="fas fa-copy"
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => copyToClipboard(account.address)}
                ></i>
                {copiedAddress === account.address && <span> (Copied!)</span>}
              </h3>
              <h3>Balance: {account.balance} ETH</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={connectToWallet}>Connect to Wallet</button>
          <p>Only the currently active account is shown. Please switch accounts manually in MetaMask if needed.</p>
        </div>
      )}
    </div>
  );

  
}

export default ConnectToWallet;