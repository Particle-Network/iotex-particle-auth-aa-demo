"use client";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";

// Import Particle Auth hooks and provider
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import {
  AAWrapProvider,
  SendTransactionMode,
  SmartAccount,
} from "@particle-network/aa";
import { ethers, type Eip1193Provider } from "ethers";

// Import the IoTex chains
import { IoTeX, IoTeXTestnet } from "@particle-network/chains";

// UI component to display links to the Particle sites
import LinksGrid from "./components/Links";
import Header from "./components/Header";
import TxNotification from "./components/TxNotification";

// Import the utility functions
import { formatBalance, truncateAddress } from "./utils/utils";

const Home: NextPage = () => {
  // Hooks to manage logins, data display, and transactions
  const { connect, disconnect, connectionStatus } = useConnect();
  const { provider, chainInfo } = useEthereum();
  const { userInfo } = useAuthCore();

  const [balance, setBalance] = useState<string>(""); // states for fetching and display the balance
  const [recipientAddress, setRecipientAddress] = useState<string>(""); // states to get the address to send tokens to from the UI
  const [address, setAddress] = useState<string>(""); // states to handle the address of the smart account
  const [transactionHash, setTransactionHash] = useState<string | null>(null); // states for the transaction hash
  const [isSending, setIsSending] = useState<boolean>(false); // state to display 'Sending...' while waiting for a hash

  // state to handle the selected transaction mode. Gasless by default
  const [selectedMode, setSelectedMode] = useState<SendTransactionMode>(
    SendTransactionMode.Gasless
  );

  // Set up and configure the smart account
  const smartAccount = new SmartAccount(provider, {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    aaOptions: {
      accountContracts: {
        SIMPLE: [
          {
            version: "2.0.0", // SIMPLE allows 1.0.0 for and 2.0.0
            chainIds: [IoTeXTestnet.id, IoTeX.id],
          },
        ],
      },
    },
  });

  // Use this syntax to upadate the smartAccount if you define more that one smart account provider in accountContracts
  //smartAccount.setSmartAccountContract({ name: "SIMPLE", version: "1.0.0" });

  // Function to create ethers provider based on selected mode. This is for ethers V6
  // use new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, mode), "any"); for Ethers V5
  const createEthersProvider = (mode: SendTransactionMode) => {
    return new ethers.BrowserProvider(
      new AAWrapProvider(smartAccount, mode) as Eip1193Provider,
      "any"
    );
  };

  // Initialize the ethers provider
  const [ethersProvider, setEthersProvider] = useState(() =>
    createEthersProvider(selectedMode)
  );

  // Update ethers provider when selectedMode changes
  useEffect(() => {
    setEthersProvider(createEthersProvider(selectedMode));
  }, [selectedMode]);

  // Fetch the balance when userInfo or chainInfo changes
  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo, chainInfo]);

  // Fetch the user's balance in Ether
  const fetchBalance = async () => {
    try {
      // Get the smart account address
      const address = await smartAccount.getAddress();
      const balanceResponse = await ethersProvider.getBalance(address);
      const balanceInEther = ethers.formatEther(balanceResponse); // ethers V5 will need the utils module for those convertion operations

      // Format the balance using the utility function
      const fixedBalance = formatBalance(balanceInEther);

      setAddress(address);
      setBalance(fixedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Handle user login
  const handleLogin = async () => {
    if (!userInfo) {
      await connect({});
    }
  };

  // Handle user disconnect
  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  // Execute an Ethereum transaction using Ethers provider
  // Simple transfer in this example
  const executeTxEthers = async () => {
    setIsSending(true);
    const signer = await ethersProvider.getSigner();
    const tx = {
      to: recipientAddress,
      value: ethers.parseEther("0.01"),
      data: "0x", // data is needed only when interacting with smart contracts. 0x equals to zero and it's here for demonstration only
    };

    try {
      const txResponse = await signer.sendTransaction(tx);
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setTransactionHash(txReceipt.hash);
        console.log(txReceipt.hash);
      } else {
        console.error("Transaction receipt is null");
      }
    } catch (error) {
      console.error("Error executing EVM transaction:", error);
    } finally {
      setIsSending(false);
    }
  };

  // The UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-black text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
        {!userInfo ? (
          <div className="login-section">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              onClick={handleLogin}
            >
              Sign in with Particle
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <div className="border border-purple-500 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-2 text-white">
                  Accounts info
                </h2>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold mb-2 text-white mr-2">
                    Name: {userInfo.name}
                  </h2>
                  <img
                    src={userInfo.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2 text-white">
                  Status: {connectionStatus}
                </h2>
                <h2 className="text-lg font-semibold mb-2 text-white">
                  Address: <code>{truncateAddress(address || "")}</code>
                </h2>
                <h3 className="text-lg mb-2 text-gray-400">
                  Chain: {chainInfo.fullname}
                </h3>
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-purple-400 mr-2">
                    Balance: {balance} {chainInfo.nativeCurrency.symbol}
                  </h3>
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center"
                    onClick={fetchBalance}
                  >
                    🔄
                  </button>
                </div>
                <div>
                  <button
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="border border-purple-500 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-2 text-white">
                  Send a transaction with the ethers provider
                </h2>
                <h2 className="text-lg">Send 0.01 ETH</h2>
                <input
                  type="text"
                  placeholder="Recipient Address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="mt-4 p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <select
                  value={selectedMode}
                  onChange={(e) =>
                    setSelectedMode(
                      parseInt(e.target.value) as SendTransactionMode
                    )
                  }
                  className="mt-4 p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value={SendTransactionMode.Gasless}>Gasless</option>
                  <option value={SendTransactionMode.UserPaidNative}>
                    User Paid Native
                  </option>
                </select>
                <button
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  onClick={executeTxEthers}
                  disabled={!recipientAddress || isSending}
                >
                  {isSending ? "Sending..." : "Send 0.01 ETH"}
                </button>
                {/* You can use chainInfo.blockExplorerUrl to always link the correct block explorer dynamically*/}
                {transactionHash && (
                  <TxNotification
                    hash={transactionHash}
                    blockExplorerUrl={chainInfo.blockExplorerUrl}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <LinksGrid />
      </main>
    </div>
  );
};

export default Home;
