
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
  }
  
  export type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: { id: string } };
  
  export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
      case 'ADD_ITEM':
        return { ...state, items: [...state.items, action.payload] };
      case 'REMOVE_ITEM':
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      default:
        return state;
    }
  };
  