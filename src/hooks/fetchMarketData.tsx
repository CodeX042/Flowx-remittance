/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

interface FiatData {
  fiatCurrency: string; // Fiat currency symbol (e.g., "usd", "eur")
  priceInStablecoin?: number; // Value of fiat currency in stablecoin (e.g., USDT)
  balance?: number; // Balance of fiat currency from your API
  flag?: string; // URL of the flag for fiat currency
}

interface UseMarketDataResult {
  fiatData: FiatData[];
  loading: boolean;
  error: string | null;
}

const useMarketData = (
  fiatCurrencies: string[], // Array of fiat currencies (e.g., ["usd", "eur"])
  stablecoin: string = "tether", // The stablecoin to compare against (e.g., USDT)
  walletApiUrl: string = "http://localhost:5000/api/wallet/balance" // Custom API URL to get balances
): UseMarketDataResult => {
  const [fiatData, setFiatData] = useState<FiatData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);

        // Fetch prices for the fiat currencies relative to the stablecoin
        const pricesRes = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${stablecoin}&vs_currencies=${fiatCurrencies.join(
            ","
          )}`
        );

        if (!pricesRes.ok) {
          throw new Error("Failed to fetch prices");
        }

        const prices = await pricesRes.json();

        // Fetch balances for each fiat currency from your custom API
        const balanceRequests = fiatCurrencies.map((currency) =>
          fetch(`${walletApiUrl}/${currency}`)
        );
        const balanceResponses = await Promise.all(balanceRequests);

        if (balanceResponses.some((res) => !res.ok)) {
          throw new Error(
            "Failed to fetch balance data for one or more fiat currencies"
          );
        }

        const balances = await Promise.all(
          balanceResponses.map((res) => res.json())
        );

        // Map the data into the desired format
        const formattedData: FiatData[] = fiatCurrencies.map(
          (currency, index) => {
            // Flag URL from flagcdn (use the first two letters of the fiat currency)
            const flagUrl = `https://flagcdn.com/w320/${currency
              .slice(0, 2)
              .toLowerCase()}.png`;

            return {
              fiatCurrency: currency.toUpperCase(),
              priceInStablecoin: prices[stablecoin]?.[currency], // Value in stablecoin
              balance: balances[index]?.balance || 0, // Add balance from your custom API
              flag: flagUrl, // URL for the flag image
            };
          }
        );

        setFiatData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching market data"
        );
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [fiatCurrencies, stablecoin, walletApiUrl]);

  return { fiatData, loading, error };
};

export default useMarketData;
