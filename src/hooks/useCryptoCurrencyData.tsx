/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

interface Cryptocurrency {
  name: string;
  logo: string;
  symbol: string;
  price: number; // Price in USD
  balance: number; // User's balance of the cryptocurrency
}

const useCryptocurrencyData = (symbols: string[]) => {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptocurrencyData = async () => {
      try {
        setLoading(true);

        // Fetch all coins from CoinGecko to map symbols to IDs
        const coinsListRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/list`
        );

        if (!coinsListRes.ok) {
          throw new Error("Failed to fetch coin list from CoinGecko");
        }

        const coinsList = await coinsListRes.json();

        // Map symbols to CoinGecko IDs
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
          throw new Error("No valid cryptocurrency symbols found");
        }

        // Fetch detailed data for each valid ID
        const fetchRequests = validIds.map((id) =>
          fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        );
        const responses = await Promise.all(fetchRequests);

        if (responses.some((res) => !res.ok)) {
          throw new Error(
            "Failed to fetch data for one or more cryptocurrencies"
          );
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
            "Failed to fetch balance for one or more cryptocurrencies"
          );
        }

        const balances = await Promise.all(
          balanceResponses.map((res) => res.json())
        );

        // Map data into the desired format
        const cryptocurrencyData = coinData.map((coin, index) => ({
          name: coin.name,
          logo: coin.image.large,
          symbol: coin.symbol.toUpperCase(),
          price: coin.market_data.current_price.usd, // Price in USD
          balance: balances[index]?.balance || 0, // Fetched balance
        }));

        setCryptocurrencies(cryptocurrencyData);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error fetching cryptocurrency data"
        );
        setLoading(false);
      }
    };

    fetchCryptocurrencyData();
  }, [symbols]);

  return { cryptocurrencies, loading, error };
};

export default useCryptocurrencyData;
