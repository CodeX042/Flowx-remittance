import { useState, useEffect, useCallback } from "react";
import { Wallet, Client } from "flowx_npm_package";

const useFlowX = (apiKey) => {
  const [client, setClient] = useState(null);
  const [wallet, setWallet] = useState(new Wallet());
  const [authenticated, setAuthenticated] = useState(false);
  const [supportedCurrencies, setSupportedCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the Client
  useEffect(() => {
    try {
      const initializedClient = new Client(apiKey);
      setClient(initializedClient);
      setAuthenticated(initializedClient.authenticated);
    } catch (err) {
      setError(err.message);
    }
  }, [apiKey]);

  // Fetch Supported Currencies
  const fetchSupportedCurrencies = useCallback(async () => {
    if (!client) return;
    setLoading(true);
    try {
      const currencies = client.getSupportedCurrencies();
      setSupportedCurrencies(currencies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [client]);

  // Get Wallet Balance
  const getWalletBalance = useCallback(
    (currency) => {
      try {
        return wallet.getWalletBalance(currency);
      } catch (err) {
        setError(err.message);
        return null;
      }
    },
    [wallet]
  );

  // Send Funds
  const sendFunds = useCallback(
    (receiverWallet, amount, currency) => {
      try {
        const transaction = new client.Transaction(
          wallet,
          receiverWallet,
          amount,
          currency
        );
        const result = wallet.sendFund(transaction);
        return result;
      } catch (err) {
        setError(err.message);
        return null;
      }
    },
    [client, wallet]
  );

  // Send Payment
  const sendPayment = useCallback(
    (receiverWallet, amount, currency) => {
      try {
        const transaction = client.sendPayment(
          wallet,
          receiverWallet,
          amount,
          currency
        );
        return transaction;
      } catch (err) {
        setError(err.message);
        return null;
      }
    },
    [client, wallet]
  );

  // Check Payment Status
  const getPaymentStatus = useCallback(
    (transactionId) => {
      try {
        return client.getPaymentStatus(transactionId);
      } catch (err) {
        setError(err.message);
        return null;
      }
    },
    [client]
  );

  return {
    authenticated,
    supportedCurrencies,
    fetchSupportedCurrencies,
    getWalletBalance,
    sendFunds,
    sendPayment,
    getPaymentStatus,
    loading,
    error,
  };
};

export default useFlowX;
