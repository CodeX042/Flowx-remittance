import BalanceSection from "../containers/BalanceSection";
import AvailableExpenses from "../containers/ExpenseCard";
import IncomeExpenseCard from "../containers/InvoiceExpenseCard";
import RevenueFlow from "../containers/RevenueFlowCard";

const DashboardPage = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-10">
      <div className="lg:flex-[0.7] flex-1  flex flex-col gap-4 ">
        <h1 className="text-white text-[50px]">My Dashboard</h1>
        <div className="space-x-4 pl-0">
          <button className="px-4 py-2 bg-teal-600 rounded-full">All</button>
          <button className="px-4 py-2 bg-teal-950 rounded-full">
            Withdrawals
          </button>
          <button className="px-4 py-2 bg-teal-950 rounded-full">
            Savings
          </button>
          <button className="px-4 py-2 bg-teal-950 rounded-full">
            Deposit
          </button>
        </div>
        <RevenueFlow />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AvailableExpenses />
          <IncomeExpenseCard title="Income" amount="$2,240" percentage="+12%" />
          <IncomeExpenseCard title="Expense" amount="$1,750" percentage="+9%" />
        </div>
      </div>
      <div className="lg:flex-[0.3] flex-1">
        <BalanceSection />
      </div>
    </div>
  );
};

export default DashboardPage;
