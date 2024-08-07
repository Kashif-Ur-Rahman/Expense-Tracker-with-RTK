import React, { useContext, useState } from 'react';
import { TransactionContext, Transaction } from '../contexts/TransactionContext';
import { FaArrowDown } from "react-icons/fa6";
import Button from './../components/Button';

const Home: React.FC = () => {
  const { state, dispatch } = useContext(TransactionContext)!;

  const [formData, setFormData] = useState<Transaction>({
    name: '',
    transactionType: 'Income',
    amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseFloat(value) : value as 'Income' | 'Expenses',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.amount) {
      dispatch({ type: 'ADD_TRANSACTION', payload: formData });
      setFormData({ name: '', transactionType: 'Income', amount: 0 });
    }
  };

  const handleDelete = (index: number) => {
    dispatch({ type: 'DELETE_TRANSACTION', index });
  };

  const incomeTotal = state.transactions.reduce(
    (acc, transaction) =>
      transaction.transactionType === 'Income' ? acc + transaction.amount : acc,
    0
  );
  const expensesTotal = state.transactions.reduce(
    (acc, transaction) =>
      transaction.transactionType === 'Expenses' ? acc + transaction.amount : acc,
    0
  );
  const total = incomeTotal - expensesTotal;

  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 w-full min-h-screen flex flex-col items-center p-4">
      <h1 className="text-4xl text-white font-bold mb-8">Expense Tracker</h1>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl mt-14">
        {/* Form Section */}
        <div className="bg-white p-6 rounded shadow-md w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="transactionType">
                Transaction Type
              </label>
              <select
                id="transactionType"
                name="transactionType"
                className="w-full lg:w-28 border border-gray-300 p-2 rounded cursor-pointer"
                value={formData.transactionType}
                onChange={handleChange}
              >
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="amount">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.amount || ''}
                onChange={handleChange}
                placeholder="Amount"
              />
            </div>
            <Button
              type="submit"
              text="Submit"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800"
            />
          </form>
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-6 rounded shadow-md w-full lg:w-1/2">
          <div className="mb-4 flex flex-wrap justify-between items-center">
            <div className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Income: ${incomeTotal}
            </div>
            <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Expenses: ${expensesTotal}
            </div>
            <div className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Total: ${total}
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 rounded-lg text-center justify-center items-center">
            History <FaArrowDown className="inline-block size-6 " />
          </h2>
          <div className="space-y-2">
            {state.transactions.map((transaction, index) => (
              <div key={index} className="flex justify-between bg-blue-200 p-4 rounded shadow">
                <div>
                  {transaction.name} - ${transaction.amount}
                </div>

                <Button
                  text="DELETE"
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                />

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
