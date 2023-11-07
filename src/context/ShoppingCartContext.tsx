import { useContext, createContext, ReactNode } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  IncreaseCartQuantity: (id: number) => void;
  DecreaseCartQuantity: (id: number) => void;
  RemoveFromCart: (id: number) => void;
};

const ShoppingCartContext = createContext<ShoppingCartContext | undefined>(undefined);

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
  }
  return context;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  // You should provide the actual context values here
  const contextValue: ShoppingCartContext = {
    getItemQuantity: (id: number) => 0, // Replace with your logic
    IncreaseCartQuantity: (id: number) => {}, // Replace with your logic
    DecreaseCartQuantity: (id: number) => {}, // Replace with your logic
    RemoveFromCart: (id: number) => {}, // Replace with your logic
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
