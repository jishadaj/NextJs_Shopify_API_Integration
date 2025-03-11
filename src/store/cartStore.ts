import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading:boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  getTotal: () => number;
  toggleCart: () => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      isOpen: false,
      loading: false, 

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      checkout: async () => {
        set({ loading: true }); 
        try {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: get().items }),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create cart");
          }
    
          const { cartUrl } = await response.json();
          if (cartUrl) {
            window.location.href = cartUrl;
          }
        } catch (error) {
          console.error("Cart Error:", error);
          alert(error);
        } finally {
          set({ loading: false }); 
        }
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "cart-storage" }
  )
);
