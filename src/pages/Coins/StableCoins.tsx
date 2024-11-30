import React, { useEffect, useState } from "react";
import { getStableCoinLogo, getWalletBalance } from "../../helpers";

interface StableCoinsProps {
  stablecoinsList: any;
}

const StableCoins = ({ stablecoinsList }: StableCoinsProps) => {
  // We assume the stablecoins data is fetched using the custom hook

  // State for storing coin balances
  const [coinBalances, setCoinBalances] = useState<any[]>([]);

  // Fetch coin balances on component mount
  useEffect(() => {
    const fetchBalances = async () => {
      const balances = await Promise.all(
        stablecoinsList.map(async (coin: any) => {
          const balance = await getWalletBalance(coin); // Assuming symbol is the unique identifier
          return { coin, balance }; // Attach the balance to the coin object
        })
      );
      setCoinBalances(balances); // Set the state with the fetched balances
    };

    if (stablecoinsList) {
      fetchBalances();
    }
  }, [stablecoinsList]); // Re-run effect if stablecoinsList changes

  return (
    <div className="bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md">
      <h2 className="text-lg font-bold">Stablecoin Balances</h2>
      <div className="mt-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Token</th>
              <th className="py-2">Balance</th>
              <th className="py-2">Fiat Value</th>
            </tr>
          </thead>
          <tbody>
            {coinBalances?.map((item: any) => (
              <tr key={item} className="border-b border-gray-700">
                <td className="py-2 flex items-center gap-2">
                  <img
                    src={getStableCoinLogo(item?.coin) || ""}
                    alt={item.coin}
                    width={24}
                    height={24}
                  />
                  <span>{item?.coin}</span> {/* Displaying symbol */}
                </td>
                <td className="py-2">{item.balance || "Loading..."}</td>{" "}
                {/* Display the fetched balance */}
                <td className="py-2">{item.price || "N/A"}</td>{" "}
                {/* Display price, assuming it's available */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StableCoins;
