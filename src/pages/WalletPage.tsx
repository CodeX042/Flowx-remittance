/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpDown, Download, Send } from "lucide-react";
import { useEffect, useState } from "react";
import IconButton from "../components/IconButton";
import Modal from "../modals/Modal";
import SendFundsForm from "../modals/SendFundsForm";
import ReceiveFundsForm from "../modals/ReceiveFundsForm";
import SwapFundsForm from "../modals/SwapFundsForm";
import useApiCall from "../hooks/useFetchData";
import StableCoins from "./Coins/StableCoins";
import Crypto from "./Coins/CryptoCurrencies";
import AfricanFiat from "./Coins/AfricanFiat";
import GlobalFiat from "./Coins/GlobalFiat";
// import useApiCall from "../hooks/useFetchData";

// interface WalletBalanceResponse {
//   balance: number;
// }
const RemittanceWalletPage = () => {
  const [showModal, setShowModal] = useState<string | null>();
  const handleOpenModal = (modal: any) => setShowModal(modal);
  const [supportedCurrencies, setSupportedCurrencies] = useState<any>([]);
  const handleCloseModal = () => setShowModal(null);
  // const { stablecoins } = useStablecoinPrices();
  const { response } = useApiCall(
    `http://localhost:5000/api/wallet/currencies`, // Your API endpoint
    "GET" // HTTP method
  );

  useEffect(() => {
    setSupportedCurrencies(JSON.parse(response?.supportedCurrencies || "{}"));
  }, [response]);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-full mx-auto space-y-4">
        {/* Wallet Header */}
        <h1 className="text-white text-[50px]">Wallet</h1>

        {/* Wallet Balance and Actions Section */}
        <div className="grid grid-cols-1 gap-8">
          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md">
            <h2 className="text-lg font-bold">Total Balance</h2>
            <div className=" flex flex-col justify-between items-center mt-4 md:flex-row">
              <h3 className="text-4xl font-bold">$12,450.00</h3>
              <div className="space-x-4 flex items-center">
                <IconButton
                  icon={Send}
                  actionName="Send Funds"
                  onClick={() => handleOpenModal("send")}
                />
                <IconButton
                  icon={Download}
                  actionName="Receive Funds"
                  onClick={() => handleOpenModal("receive")}
                />
                <IconButton
                  icon={ArrowUpDown}
                  actionName="Swap"
                  onClick={() => handleOpenModal("swap")}
                />
              </div>
            </div>
          </div>

          {/* Stablecoin Balances */}
          <StableCoins stablecoinsList={supportedCurrencies?.stablecoins} />
          {/* crypto Balances */}
          <Crypto cryptoCoinsList={supportedCurrencies?.cryptocurrencies} />
          {/* africanfiat Balances */}
          <AfricanFiat africanFiat={supportedCurrencies?.africanFiat} />
          {/* globalfiat Balances */}
          <GlobalFiat globalFiat={supportedCurrencies?.globalFiat} />
        </div>

        {/* Modal Section */}
        <Modal
          show={showModal === "send"}
          title="Send Funds"
          onClose={handleCloseModal}
        >
          <SendFundsForm onClose={handleCloseModal} />
        </Modal>

        <Modal
          show={showModal === "receive"}
          title="Receive Funds"
          onClose={handleCloseModal}
        >
          <ReceiveFundsForm onClose={handleCloseModal} />
        </Modal>

        <Modal
          show={showModal === "swap"}
          title="Swap Funds"
          onClose={handleCloseModal}
        >
          <SwapFundsForm
            onClose={handleCloseModal}
            currencies={supportedCurrencies}
          />
        </Modal>
      </div>
    </div>
  );
};

export default RemittanceWalletPage;
