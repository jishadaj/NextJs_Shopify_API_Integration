'use client';
import { useCartStore } from '@/store/cartStore';

export default function Cart({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity, clearCart, checkout, getTotal, loading } = useCartStore();
  const total = getTotal();

  return (
    <div className="fixed right-4 top-16 bg-white p-4 border rounded-lg shadow-lg w-80 z-50">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 text-lg font-bold"
        >
          ✕
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="border-b pb-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 p-1 border rounded"
                    min="1"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <p className="text-lg font-semibold">
              Total: <span className="text-green-600">${total.toFixed(2)}</span>
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={clearCart}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              onClick={checkout}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              {loading ? "Checking out..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
