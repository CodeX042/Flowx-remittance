/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import { useWallet } from "@suiet/wallet-kit";

const SendFundsForm = ({ onClose }: any) => {
  const { address } = useWallet();
  // Initial state for send details
  const [sendDetails, setSendDetails] = useState({
    senderId: "", // Assuming senderId is passed as a prop or available from context
    receiverId: "",
    amount: "",
    currency: "", // Assuming default currency is "SUI", adjust as needed
  });

  // Loading state to show loading indicator while processing the request
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // For error handling
  const [success, setSuccess] = useState<string | null>(null); // For success message

  // Handle input change and update the state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSendDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendFunds();
  };

  // Make API call to send funds using axios
  const handleSendFunds = async () => {
    setLoading(true); // Set loading to true when the request starts
    setError(null); // Reset any previous errors
    setSuccess(null); // Reset success message

    try {
      // Make the API call to send funds using axios
      const response = await axios.post(
        "http://localhost:5000/api/wallet/send-funds",
        {
          receiverId: sendDetails.receiverId,
          amount: sendDetails.amount,
          currency: sendDetails.currency,
          senderId: address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Funds sent successfully!");
      console.log("Funds sent:", response.data); // Handle the response as needed
    } catch (error: any) {
      setError(error.message || "An error occurred while sending funds");
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="recipient" className="text-sm text-gray-300">
          Recipient Wallet Address
        </label>
        <input
          type="text"
          id="recipient"
          name="receiverId"
          value={sendDetails.receiverId}
          onChange={handleChange}
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
          placeholder="0x1234...abcd"
        />
      </div>
      <div>
        <label htmlFor="currency" className="text-sm text-gray-300">
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          value={sendDetails.receiverId}
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
        >
          <option>EUR</option>
          <option>USD</option>
          <option>ETH</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount" className="text-sm text-gray-300">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={sendDetails.amount}
          onChange={handleChange}
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
          placeholder="Enter amount"
        />
      </div>

      {/* Display loading, success, or error message */}
      {loading && <p className="text-teal-600">Processing...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <div className="flex justify-between items-center">
        <Button
          btnText={loading ? "Sending..." : "Send Funds"}
          customStyles="bg-teal-600 text-white hover:bg-teal-700"
          handleButtonClick={handleSendFunds}
          disabled={loading} // Disable button while loading
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

export default SendFundsForm;
