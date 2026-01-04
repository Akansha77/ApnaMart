"use client"

import type React from "react"
import Footer from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  stock: number
  thumbnail: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    console.log("[v0] Loading cart from localStorage:", savedCart)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        console.log("[v0] Parsed cart items:", parsedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error("Failed to load cart:", error)
      }
    }
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      localStorage.removeItem("cart")
      setIsProcessing(false)
      // Navigate to order confirmation
      router.push("/order-confirmation")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartCount={0} onCartClick={() => {}} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing Payment..." : "Complete Purchase"}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border border-border sticky top-20">
              <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>

              {cartItems.length > 0 && (
                <div className="space-y-2 mb-4 pb-4 border-b border-border max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.title.substring(0, 20)}... x {item.quantity}
                      </span>
                      <span className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-accent">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
