const Transactions = () => {
  return (
    <>
      {/* Transaction History Section */}
      <div className="bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <div className="flex flex-col gap-4 mt-4">
          {/* Sample Transactions */}
          {[
            {
              name: "Sent to John",
              date: "Nov 25, 2024",
              amount: "-$300.00",
              icon: "send",
            },
            {
              name: "Received from Maria",
              date: "Nov 22, 2024",
              amount: "+$1,200.00",
              icon: "receive",
            },
            {
              name: "Swap",
              date: "Nov 20, 2024",
              amount: "-$50.00",
              icon: "swap",
            },
          ].map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3rounded-lg shadow-sm hover:bg-gray-700/40 transition"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-700/60 p-3 rounded-full">
                  {/* <LucideIcon icon={transaction.icon} className="h-6 w-6" /> */}
                </div>
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <p
                className={`font-bold ${
                  transaction.amount.startsWith("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Transactions;
