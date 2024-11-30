import React, { useEffect, useState } from "react";
import { getStableCoinLogo, getWalletBalance } from "../../helpers";

interface CryptoProps {
  cryptoCoinsList: any;
}

const Crypto = ({ cryptoCoinsList }: CryptoProps) => {
  const [cryptoBalances, setCryptoBalances] = useState<any[]>([]);

  // Fetch cryptocurrency balances on component mount
  useEffect(() => {
    const fetchCryptoBalances = async () => {
      const balances = await Promise.all(
        cryptoCoinsList.map(async (coin: any) => {
          const balance = await getWalletBalance(coin); // Assuming coin is the unique identifier
          return { coin, balance }; // Attach the balance to the coin object
        })
      );
      setCryptoBalances(balances); // Set the state with the fetched crypto balances
    };

    if (cryptoCoinsList) {
      fetchCryptoBalances();
    }
  }, [cryptoCoinsList]); // Re-run effect if cryptoCoinsList changes

  return (
    <div className="bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md">
      <h2 className="text-lg font-bold">Other Coins Balances</h2>
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
            {cryptoBalances?.map((item: any) => (
              <tr key={item?.coin} className="border-b border-gray-700">
                <td className="py-2 flex items-center gap-2">
                  <img
                    src={getStableCoinLogo(item?.coin) || undefined}
                    alt={item?.coin}
                    width={24}
                    height={24}
                  />
                  <span>{item?.coin}</span>
                </td>
                <td className="py-2">{item.balance || "Loading..."}</td>
                <td className="py-2">{item.price || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crypto;
