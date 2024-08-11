import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const TransactionTotals: React.FC = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const incomeTotal = transactions.reduce(
    (acc, transaction) =>
      transaction.transactionType === 'Income' ? acc + transaction.amount : acc,
    0
  );
  const expensesTotal = transactions.reduce(
    (acc, transaction) =>
      transaction.transactionType === 'Expenses' ? acc + transaction.amount : acc,
    0
  );
  const total = incomeTotal - expensesTotal;

  return (
    <div className="mb-4 flex justify-between w-full">
      <div className="bg-green-400 text-white py-2 px-4 rounded">Income: {incomeTotal}</div>
      <div className="bg-red-400 text-white py-2 px-4 rounded">Expenses: {expensesTotal}</div>
      <div className="bg-teal-500 text-white py-2 px-4 rounded">Total: {total}</div>
    </div>
  );
};

export default TransactionTotals;
