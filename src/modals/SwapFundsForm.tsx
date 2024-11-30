import Button from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SwapFundsForm = ({ onClose, currencies }: any) => {
  // State to manage selected currencies and other form data
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currencyList, setCurrencyList] = useState<any>([]);

  useEffect(() => {
    const combinedList = [
      ...currencies.africanFiat,
      ...currencies.cryptocurrencies,
      ...currencies.globalFiat,
      ...currencies.stablecoins,
    ];
    setCurrencyList(combinedList);
  }, [currencies]);

  // Handle changes in select inputs and other fields
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "fromCurrency") {
      setFromCurrency(value);
    } else if (name === "toCurrency") {
      setToCurrency(value);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // Handle form submission
  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state while making the request
    setError(null); // Reset any previous error

    if (!amount || parseFloat(amount) <= 0) {
      setError("Amount must be greater than zero.");
      setLoading(false);
      return;
    }

    // Prepare payload for swap API
    const payload = {
      fromCurrency,
      toCurrency,
      amount,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/wallet/swap-funds",
        payload
      );
      console.log("Swap Successful", response.data);
      // Optionally, handle success response (e.g., show a success message)
      setLoading(false);
    } catch (error: any) {
      console.error("Error swapping funds", error.message);
      setError(
        error?.response?.data?.message || "An error occurred during the swap."
      );
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSwap}>
      {/* From Currency */}
      <div>
        <label htmlFor="fromCurrency" className="text-sm text-gray-300">
          From Currency
        </label>
        <select
          id="fromCurrency"
          name="fromCurrency"
          value={fromCurrency}
          onChange={handleSelectChange}
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
        >
          {currencyList?.map((currency: any, index: number) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      {/* To Currency */}
      <div>
        <label htmlFor="toCurrency" className="text-sm text-gray-300">
          To Currency
        </label>
        <select
          id="toCurrency"
          name="toCurrency"
          value={toCurrency}
          onChange={handleSelectChange}
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
        >
          {currencyList?.map((currency: any, index: any) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="text-sm text-gray-300">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
          placeholder="Enter amount"
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <Button
          btnText={loading ? "Processing..." : "Swap"}
          customStyles="bg-teal-600 text-white hover:bg-teal-700"
          disabled={loading}
          handleButtonClick={handleSwap}
        />
        <Button
          btnText="Cancel"
          customStyles="bg-gray-600 text-white hover:bg-gray-700"
          handleButtonClick={onClose}
        />
      </div>
    </form>
  );
};

export default SwapFundsForm;
