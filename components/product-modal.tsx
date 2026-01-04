"use client"

import React, { useEffect } from "react"

interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  images: string[]
  stock: number
  category: string
  brand: string
  rating: number
  discountPercentage: number
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
}

function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const originalPrice = product.price / (1 - product.discountPercentage / 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-card rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden border border-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative bg-muted h-64 md:h-full">
            <img
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                -{Math.round(product.discountPercentage)}%
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
            {/* Category & Brand */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-1 rounded">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-xs text-muted-foreground">by {product.brand}</span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-foreground mb-3">{product.title}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-muted"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating.toFixed(1)})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-accent">${product.price.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="text-lg text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-sm text-destructive font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                onAddToCart(product)
                onClose()
              }}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                product.stock > 0
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProductModal)
