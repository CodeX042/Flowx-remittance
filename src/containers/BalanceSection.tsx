/* eslint-disable react-hooks/exhaustive-deps */
import { PlusIcon } from "lucide-react";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { useWallet } from "@suiet/wallet-kit";

const client = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

const RightDashboard = () => {
  const [coinBalance, setCoinBalance] = useState<any>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { address } = useWallet();

  const fetchCoinBalance = async () => {
    if (address) {
      try {
        const coinBalance: any = await client.getBalance({
          owner: address,
        });
        setCoinBalance(coinBalance);
      } catch (error) {
        console.error("Error fetching coin balance:", error);
      }
    }
  };

  useEffect(() => {
    if (address) {
      setIsConnected(true);
      fetchCoinBalance();
    } else {
      setIsConnected(false);
    }
  }, [address]);

  return (
    <div className="relative flex flex-col gap-6 h-full">
      {/* My Card Section */}
      <div className="relative bg-gradient-to-r from-teal-700/50 to-teal-800/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md ">
        <h2 className="text-lg font-bold text-white mb-4">My Card</h2>
        <div className="relative bg-gradient-to-r from-teal-700 to-teal-800 p-6 rounded-3xl shadow-lg">
          <div className="text-white">
            <p className="text-sm">Total Balance</p>
            {isConnected ? (
              <h3 className="text-3xl font-bold">
                SUI {coinBalance?.totalBalance || "0.00"}
              </h3>
            ) : (
              <h3 className="text-3xl font-bold text-gray-400">
                Connect Wallet
              </h3>
            )}
          </div>
          <p className="text-gray-200 text-sm mt-4">4358 4445 0968 2323</p>
          <p className="text-gray-200 text-sm">08/24</p>
          {/* Add Icon */}
          <button className="absolute top-4 right-4 bg-white text-teal-600 rounded-full p-2 shadow-md">
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="absolute top-44 left-0 right-0 mx-auto bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg max-w-full h-full-translate-y-6 min-h-[78%]">
        <h2 className="flex items-center justify-between text-lg font-bold text-white mb-4 border-b border-b-gray-500 p-6">
          <span>Transactions</span>
          <span className="font-light cursor-pointer">View All</span>
        </h2>
        <div className="flex flex-col gap-4 p-6">
          {/* Single Transaction Item */}
          {[
            { name: "Figma", amount: "-$15.00", icon: "figma" },
            { name: "Grammarly", amount: "-$10.00", icon: "file-text" },
            { name: "Blender", amount: "-$15.00", icon: "cpu" },
          ].map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-white"
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="bg-gray-700/60 p-2 rounded-full">
                  {/* <LucideIcon icon={transaction.icon} className="h-6 w-6" /> */}
                </div>
                {/* Name */}
                <p className="text-sm">{transaction.name}</p>
              </div>
              {/* Amount */}
              <p className="text-sm text-white">{transaction.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightDashboard;
