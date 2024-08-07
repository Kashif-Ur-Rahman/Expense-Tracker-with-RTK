
import React, { createContext, useReducer, ReactNode } from 'react';

export interface Transaction {
  name: string;
  transactionType: 'Income' | 'Expenses';
  amount: number;
}

interface State {
  transactions: Transaction[];
}

interface Action {
  type: string;
  payload?: Transaction;
  index?: number;
}

const initialState: State = {
  transactions: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload!],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((_, i) => i !== action.index),
      };
    default:
      return state;
  }
};

interface TransactionContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const TransactionContext = createContext<TransactionContextProps | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};


export default TransactionContext;