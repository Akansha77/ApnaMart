"use client"

import { useRouter } from "next/navigation"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  stock: number
  thumbnail: string
}

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemoveItem: (productId: number) => void
}

export default function Cart({ items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const router = useRouter()
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 text-muted-foreground mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="text-muted-foreground text-lg">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Shopping Cart</h2>
        <p className="text-muted-foreground text-sm">
          {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
            <img
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-grow">
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-accent font-semibold">${item.price.toFixed(2)}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 border border-border rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 text-foreground hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="px-3 py-1 text-foreground font-medium">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, Math.min(item.quantity + 1, item.stock))}
                  disabled={item.quantity >= item.stock}
                  className="px-2 py-1 text-foreground hover:bg-muted transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-xs text-destructive hover:text-destructive/80 transition-colors font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t border-border pt-6">
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground font-medium">Free</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
            <span className="text-foreground">Total</span>
            <span className="text-accent">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}
