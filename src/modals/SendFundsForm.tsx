/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "../components/Button";

const SendFundsForm = ({ onClose }: any) => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="recipient" className="text-sm text-gray-300">
          Recipient Wallet Address
        </label>
        <input
          type="text"
          id="recipient"
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
          placeholder="0x1234...abcd"
        />
      </div>
      <div>
        <label htmlFor="amount" className="text-sm text-gray-300">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
          placeholder="Enter amount"
        />
      </div>
      <div className="flex justify-between items-center">
        <Button
          btnText="Send Funds"
          customStyles="bg-teal-600 text-white hover:bg-teal-700"
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

export default SendFundsForm;
