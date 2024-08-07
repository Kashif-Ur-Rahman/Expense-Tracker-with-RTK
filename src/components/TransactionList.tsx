
import React, { useContext } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';

const TransactionList: React.FC = () => {
  const { state, dispatch } = useContext(TransactionContext)!;

  const handleDelete = (index: number) => {
    dispatch({ type: 'DELETE_TRANSACTION', index });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-1/2 ml-4">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className="space-y-2">
        {state.transactions.map((transaction, index) => (
          <div key={index} className="flex justify-between bg-green-50 p-4 rounded shadow">
            <div>{transaction.name} - ${transaction.amount}</div>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded"
              onClick={() => handleDelete(index)}
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
