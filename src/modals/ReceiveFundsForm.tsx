/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useWallet } from "@suiet/wallet-kit";
import Button from "../components/Button";

const ReceiveFundsForm = ({ onClose }: any) => {
  const { address } = useWallet();
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopySuccess("Address copied!");
      setTimeout(() => setCopySuccess(null), 2000); // Reset message after 2 seconds
    }
  };

  // Shorten the address for display
  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="text-center space-y-4">
      <p className="text-gray-300">
        To receive funds, share your wallet address below:
      </p>
      <div className="bg-gray-700/60 p-4 rounded-lg text-xl font-bold text-teal-500 flex items-center justify-between space-x-4">
        <span>{address ? shortenAddress(address) : "Loading..."}</span>
        <button
          onClick={handleCopyAddress}
          className="text-sm bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 focus:outline-none"
        >
          Copy
        </button>
      </div>
      {copySuccess && <p className="text-sm text-teal-400">{copySuccess}</p>}
      <Button
        btnText="Close"
        customStyles="bg-gray-600 text-white hover:bg-gray-700"
        handleButtonClick={onClose}
      />
    </div>
  );
};

export default ReceiveFundsForm;
