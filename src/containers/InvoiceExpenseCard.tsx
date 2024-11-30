const IncomeExpenseCard = ({
  title,
  amount,
  percentage,
}: {
  title: string;
  amount: string;
  percentage: string;
}) => {
  return (
    <div className="bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md flex flex-col gap-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="text-3xl font-semibold">{amount}</div>
      <div className={`flex items-center justify-between w-full`}>
        <div className="text-gray-300">This week's {title}</div>
        <div className="text-sm p-2 rounded-full px-4 bg-teal-500 text-white w-20">
          {percentage}
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseCard;
