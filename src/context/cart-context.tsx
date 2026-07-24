"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  itemCount: number;
  totalPrice: number;

  openCart: () => void;
  closeCart: () => void;

  addItem: (product: Product, quantity?: number) => void;

  removeItem: (productId: Product["id"]) => void;

  updateQuantity: (productId: Product["id"], quantity: number) => void;

  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function addItem(product: Product, quantity = 1) {
    const safeQuantity = Math.max(1, quantity);

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + safeQuantity,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          product,
          quantity: safeQuantity,
        },
      ];
    });

    setIsCartOpen(true);
  }

  function removeItem(productId: Product["id"]) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  }

  function updateQuantity(productId: Product["id"], quantity: number) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [items],
  );

  const value: CartContextValue = {
    items,
    isCartOpen,
    itemCount,
    totalPrice,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart hook-ийг CartProvider component-ийн дотор ашиглана уу.",
    );
  }

  return context;
}
