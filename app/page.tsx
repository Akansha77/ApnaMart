"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import SearchBar from "@/components/search-bar"
import Filters from "@/components/filters"
import ProductGrid from "@/components/product-grid"
import ProductSkeleton from "@/components/product-skeleton"
import Cart from "@/components/cart"
import Footer from "@/components/footer"
import ProductModal from "@/components/product-modal"
import { ToastProvider, useToastContext } from "@/components/toast-provider"
import { useDebounce } from "@/hooks/use-debounce"

function HomeContent() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"none" | "low-high" | "high-low">("none")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [maxPrice, setMaxPrice] = useState(2000)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [showCart, setShowCart] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  
  const { addToast } = useToastContext()

  // Debounced search term for performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=20")
        const data = await response.json()
        setProducts(data.products)

        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map((p: any) => p.category))]
        setCategories(uniqueCategories as string[])

        // Calculate max price for filter
        const max = Math.ceil(Math.max(...data.products.map((p: any) => p.price)))
        setMaxPrice(max)
        setPriceRange([0, max])
      } catch (error) {
        console.error("Error fetching products:", error)
        addToast("Failed to load products. Please try again.", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Search filter (using debounced value)
    if (debouncedSearchTerm) {
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    }

    // Category filter (multiple)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    // Price range filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    if (sortBy === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [products, debouncedSearchTerm, selectedCategories, priceRange, sortBy])

  const handleAddToCart = useCallback((product: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          addToast(`Updated ${product.title} quantity`, "success")
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
        addToast("Maximum stock limit reached", "error")
        return prevItems
      } else {
        addToast(`${product.title} added to cart`, "success")
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }, [addToast])

  const handleUpdateQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId)
      }
      return prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    })
  }, [])

  const handleRemoveFromCart = useCallback((productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    addToast("Item removed from cart", "info")
  }, [addToast])

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSortBy("none")
    setPriceRange([0, maxPrice])
  }

  // Calculate total cart quantity
  const totalCartQuantity = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }, [cartItems])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartCount={totalCartQuantity} onCartClick={() => setShowCart(!showCart)} />

      {!showCart && <Hero />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <Filters
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              sortBy={sortBy}
              onSortChange={setSortBy}
              priceRange={priceRange}
              maxPrice={maxPrice}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {showCart ? (
              <Cart items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveFromCart} />
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      {selectedCategories.length === 1
                        ? selectedCategories[0]
                        : selectedCategories.length > 1
                        ? `${selectedCategories.length} Categories`
                        : "All Products"}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                    </p>
                  </div>
                  {(selectedCategories.length > 0 || debouncedSearchTerm || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                    <div className="hidden sm:flex items-center gap-2 text-xs">
                      {debouncedSearchTerm && (
                        <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-full">
                          Search: "{debouncedSearchTerm}"
                        </span>
                      )}
                      {selectedCategories.map((cat) => (
                        <span key={cat} className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-full capitalize">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {loading ? (
                  <ProductSkeleton count={6} />
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-muted-foreground text-lg mb-2">No products found</p>
                    <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters or search term</p>
                    <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <ProductGrid
                    products={filteredProducts}
                    onAddToCart={handleAddToCart}
                    onProductClick={setSelectedProduct}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Product Details Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  )
}
