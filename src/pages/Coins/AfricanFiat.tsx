import React, { useEffect, useState } from "react";
import { getCurrencyLogo, getWalletBalance } from "../../helpers";

interface AfricanFiatProps {
  africanFiat: any;
}

const AfricanFiat = ({ africanFiat }: AfricanFiatProps) => {
  // State to store the balances of the African fiat currencies
  const [fiatBalances, setFiatBalances] = useState<any[]>([]);

  // Fetch the market data using the custom hook

  // Fetch fiat balances on component mount
  useEffect(() => {
    const fetchFiatBalances = async () => {
      const balances = await Promise.all(
        africanFiat.map(async (currency: any) => {
          const balance = await getWalletBalance(currency); // Assuming fiatCurrency is the unique identifier
          return { currency, balance }; // Attach the balance to the currency object
        })
      );
      setFiatBalances(balances); // Set the state with the fetched fiat balances
    };

    if (africanFiat) {
      fetchFiatBalances();
    }
  }, [africanFiat]); // Re-run effect if africanFiat changes

  return (
    <div className="bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md">
      <h2 className="text-lg font-bold">African Fiat Balances</h2>
      <div className="mt-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Currency</th>
              <th className="py-2">Balance</th>
              <th className="py-2">Fiat Value (in USDT)</th>
            </tr>
          </thead>
          <tbody>
            {fiatBalances?.map((item: any) => (
              <tr key={item?.currency} className="border-b border-gray-700">
                <td className="py-2 flex items-center gap-2">
                  <img
                    src={getCurrencyLogo(item?.currency) || ""}
                    alt={item?.currency}
                    width={24}
                    height={24}
                  />
                  <span>{item?.currency}</span> {/* Displaying item */}
                </td>
                <td className="py-2">{item.balance || "Loading..."}</td>
                <td className="py-2">{item.priceInUsdt || "N/A"}</td>{" "}
                {/* Assuming the price is available */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AfricanFiat;
