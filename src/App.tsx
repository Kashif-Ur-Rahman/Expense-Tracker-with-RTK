
import React from 'react';
import { TransactionProvider } from './contexts/TransactionContext';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <TransactionProvider>
      <Home />
    </TransactionProvider>
   
  );
};

export default App;
