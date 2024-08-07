import React, { createContext, useReducer, ReactNode } from 'react';
import { cartReducer, CartState, CartAction } from './cartReducer';

interface CartProviderProps {
  children: ReactNode;
}

const initialState: CartState = {
  items: [],
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
