import { createContext, useContext, useState } from "react";
import { CartProviderProps, CartContextTypes, CartItem } from "../types/types";
import Cart from "../components/Cart/Cart";

const CartContext = createContext({} as CartContextTypes);

export function useCart() {
  return useContext(CartContext);
}

export function CartContextProvider({ children }: CartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const clearCart = () => setCartItems([]);

  function addToCart(data: CartItem) {
    setCartItems((prev) => [...prev, data]);
  }

  function removeFromCart(id: number) {
    setCartItems((prev) => {
      return prev.filter((item, index) => index !== id);
    });
    console.log("removeFromCart: ", id);
  }

  const cartQuantity = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        openCart,
        closeCart,
        clearCart,
        addToCart,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <Cart isOpen={isOpen} />
    </CartContext.Provider>
  );
}
