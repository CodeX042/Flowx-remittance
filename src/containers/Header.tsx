import React from "react";
import { Search } from "lucide-react";
import { ConnectButton, useWallet } from "@suiet/wallet-kit"; // Using Lucide icons

const Header: React.FC = () => {
  const { address, disconnect } = useWallet();

  return (
    <header className="flex justify-between items-center px-10 min-h-[10vh] z-50">
      {/* Left Section: Logo */}
      <h1 className="text-xl text-white font-bold uppercase">REMIT</h1>

      {/* Center Section: Search bar */}
      <div className="hidden md:flex flex-1 mx-6 items-center gap-4 ">
        <div className="relative w-full bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/20 max-w-md flex items-center gap-4 rounded-full outline-none focus:ring-1 focus:border-teal-400 h-10 px-4">
          <Search className=" text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full p4  text-gray-300 outline-none h-full bg-transparent"
          />
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-6 text-gray-400">
        {/* Show Connect Button if no address is connected */}
        {!address ? (
          <ConnectButton
            style={{
              backgroundColor: "#1f2937",
              color: "#fff",
              borderRadius: "9999px",
              padding: "8px 16px",
              fontSize: "14px",
              zIndex: "100",
            }}
          >
            Connect Wallet
          </ConnectButton>
        ) : (
          <>
            {/* Show Address in White Text */}
            <div className="text-white text-sm font-semibold">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>

            {/* Disconnect Button */}
            <button
              onClick={disconnect}
              className="text-teal-400 text-sm font-semibold hover:text-teal-500"
            >
              Disconnect
            </button>
          </>
        )}

        {/* Notification Icon */}
        <div className="text-white text-lg">Hi!</div>

        {/* User Profile */}
        <button className="hover:text-teal-400">
          <img src="/assets/avatar.png" alt="" className="rounded-full" />
        </button>
      </div>
    </header>
  );
};

export default Header;
