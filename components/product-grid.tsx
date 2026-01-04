"use client"

import React, { useState } from "react"

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  stock: number
  category: string
  discountPercentage?: number
}

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onProductClick?: (product: Product) => void
}

function ProductGrid({ products, onAddToCart, onProductClick }: ProductGridProps) {
  const [addingToCart, setAddingToCart] = useState<number | null>(null)

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    setAddingToCart(product.id)
    onAddToCart(product)
    setTimeout(() => setAddingToCart(null), 500)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="group bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border flex flex-col cursor-pointer transform hover:-translate-y-1"
          onClick={() => onProductClick?.(product)}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Image Container */}
          <div className="relative bg-muted h-52 overflow-hidden">
            <img
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {/* Price Badge */}
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
              ${product.price.toFixed(2)}
            </div>
            {/* Discount Badge */}
            {product.discountPercentage && product.discountPercentage > 10 && (
              <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-bold">
                -{Math.round(product.discountPercentage)}%
              </div>
            )}
            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-medium text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                Quick View
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-4">
            <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-accent transition-colors">
              {product.title}
            </h3>

            {/* Category */}
            <span className="text-xs text-muted-foreground capitalize mb-2 inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {product.category}
            </span>

            {/* Stock Status */}
            <div className="mb-4 flex items-center gap-1">
              {product.stock > 0 ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></span>
                  <span className="text-xs text-green-600 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-destructive rounded-full"></span>
                  <span className="text-xs text-destructive font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Button */}
            <button
              onClick={(e) => handleAddToCart(e, product)}
              disabled={product.stock === 0 || addingToCart === product.id}
              className={`mt-auto w-full py-2.5 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center gap-2 ${
                product.stock > 0
                  ? addingToCart === product.id
                    ? "bg-green-500 text-white scale-95"
                    : "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-md active:scale-95"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {addingToCart === product.id ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added!
                </>
              ) : product.stock > 0 ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </>
              ) : (
                "Out of Stock"
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(ProductGrid)
