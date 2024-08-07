
import React, { useState, useContext } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';
import { Transaction } from './../contexts/TransactionContext';
import Button from './../components/Button';

const TransactionForm: React.FC = () => {
  const { dispatch } = useContext(TransactionContext)!;

  const [formData, setFormData] = useState<Transaction>({
    name: '',
    transactionType: 'Income',
    amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'transactionType') {
      setFormData({ ...formData, [name]: value as 'Income' | 'Expenses' });
    } else if (name === 'amount') {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.amount) {
      dispatch({ type: 'ADD_TRANSACTION', payload: formData });
      setFormData({ name: '', transactionType: 'Income', amount: 0 });
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-1/2 mr-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
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
          <label className="block text-sm font-medium mb-1" htmlFor="transactionType">Transaction Type</label>
          <select
            id="transactionType"
            name="transactionType"
            className="w-28 border border-gray-300 p-2 rounded cursor-pointer"
            value={formData.transactionType}
            onChange={handleChange}
          >
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="amount">Amount</label>
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
          className="bg-teal-500 text-white py-2 px-4 rounded"
        />
      </form>
    </div>
  );
};

export default TransactionForm;
