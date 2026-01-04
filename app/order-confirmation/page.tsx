"use client"

import { useRouter } from "next/navigation"
import Header from "@/components/header"

export default function OrderConfirmationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCartClick={() => {}} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 text-accent mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-semibold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <div className="bg-card p-8 rounded-lg border border-border mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-2xl font-semibold text-foreground">
                  #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                <p className="text-lg text-foreground">5-7 Business Days</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    </div>
  )
}
