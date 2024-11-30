import Button from "../components/Button";
import useApiCall from "../hooks/useFetchData";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SwapFundsForm = ({ onClose }: any) => {
  const { response, loading, error } = useApiCall(
    `http://localhost:5000/api/wallet/currencies`, // Your API endpoint
    "GET" // HTTP method
  );

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="fromCurrency" className="text-sm text-gray-300">
          From Currency
        </label>
        <select
          id="fromCurrency"
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
        >
          <option>USD</option>
          <option>EUR</option>
          <option>BTC</option>
        </select>
      </div>
      <div>
        <label htmlFor="toCurrency" className="text-sm text-gray-300">
          To Currency
        </label>
        <select
          id="toCurrency"
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
        >
          <option>EUR</option>
          <option>USD</option>
          <option>ETH</option>
        </select>
      </div>
      <div className="flex justify-between items-center">
        <Button
          btnText="Swap"
          customStyles="bg-teal-600 text-white hover:bg-teal-700 "
        />
        <Button
          btnText="Cancel"
          customStyles="bg-gray-600 text-white hover:bg-gray-700 "
          handleButtonClick={onClose}
        />
      </div>
    </form>
  );
};

export default SwapFundsForm;
