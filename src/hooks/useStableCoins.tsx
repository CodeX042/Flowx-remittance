/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

interface Stablecoin {
  name: string;
  logo: string | null; // CoinPaprika doesn't always provide logos
  symbol: string;
  price: number; // Price in USD
  balance: number; // User's balance of the stablecoin
}

const useStablecoinData = (symbols: string[]) => {
  const [stablecoins, setStablecoins] = useState<Stablecoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStablecoins = async () => {
      try {
        setLoading(true);

        // Fetch the list of coins to map symbols to CoinPaprika IDs
        const coinsListRes = await fetch(
          `https://api.coinpaprika.com/v1/coins`
        );

        if (!coinsListRes.ok) {
          throw new Error("Failed to fetch coins list from CoinPaprika");
        }

        const coinsList = await coinsListRes.json();

        // Map symbols to CoinPaprika IDs
        const symbolToIdMap: Record<string, string> = coinsList.reduce(
          (acc: Record<string, string>, coin: any) => {
            acc[coin.symbol.toLowerCase()] = coin.id;
            return acc;
          },
          {}
        );

        const validIds = symbols
          .map((symbol) => symbolToIdMap[symbol.toLowerCase()])
          .filter(Boolean);

        if (validIds.length === 0) {
          throw new Error("No valid symbols found");
        }

        // Fetch detailed data for each valid ID
        const fetchRequests = validIds.map((id) =>
          fetch(`https://api.coinpaprika.com/v1/tickers/${id}`)
        );
        const responses = await Promise.all(fetchRequests);

        if (responses.some((res) => !res.ok)) {
          throw new Error("Failed to fetch data for one or more stablecoins");
        }

        const coinData = await Promise.all(responses.map((res) => res.json()));

        // Fetch balances for each symbol
        const balanceRequests = symbols.map((symbol) =>
          fetch(
            `http://localhost:5000/api/wallet/balance/${symbol.toUpperCase()}`
          )
        );
        const balanceResponses = await Promise.all(balanceRequests);

        if (balanceResponses.some((res) => !res.ok)) {
          throw new Error(
            "Failed to fetch balance for one or more stablecoins"
          );
        }

        const balances = await Promise.all(
          balanceResponses.map((res) => res.json())
        );

        // Map the data into the desired format
        const stablecoinData = coinData.map((coin, index) => ({
          name: coin.name,
          logo: coin.logo || null, // CoinPaprika might not always provide logos
          symbol: coin.symbol.toUpperCase(),
          price: coin.quotes.USD.price, // Price in USD
          balance: balances[index]?.balance || 0, // Fetched balance
        }));

        setStablecoins(stablecoinData);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching stablecoin data"
        );
        setLoading(false);
      }
    };

    fetchStablecoins();
  }, [symbols]);

  return { stablecoins, loading, error };
};

export default useStablecoinData;
