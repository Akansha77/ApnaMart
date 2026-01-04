"use client"

import { useState } from "react"

interface FiltersProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  sortBy: "none" | "low-high" | "high-low"
  onSortChange: (sort: "none" | "low-high" | "high-low") => void
  priceRange: [number, number]
  maxPrice: number
  onPriceRangeChange: (range: [number, number]) => void
  onClearFilters: () => void
}

export default function Filters({
  categories,
  selectedCategories,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  maxPrice,
  onPriceRangeChange,
  onClearFilters,
}: FiltersProps) {
  const hasActiveFilters = selectedCategories.length > 0 || sortBy !== "none" || priceRange[0] > 0 || priceRange[1] < maxPrice
  const [isExpanded, setIsExpanded] = useState(true)

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  return (
    <div className="space-y-6">
      {/* Mobile toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-lg"
      >
        <span className="font-semibold text-foreground">Filters</span>
        <svg
          className={`w-5 h-5 text-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`space-y-6 ${isExpanded ? "block" : "hidden lg:block"}`}>
        {/* Categories */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Categories
            {selectedCategories.length > 0 && (
              <span className="ml-auto bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                {selectedCategories.length}
              </span>
            )}
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-muted transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 rounded border-border accent-accent"
                />
                <span className="text-sm text-foreground capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                  min={0}
                  max={priceRange[1]}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <span className="text-muted-foreground mt-5">—</span>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  min={priceRange[0]}
                  max={maxPrice}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-accent"
            />
            <p className="text-xs text-muted-foreground text-center">
              ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
            </p>
          </div>
        </div>

        {/* Sort */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sort by Price
          </h3>
          <div className="space-y-2">
            {[
              { value: "none", label: "Default" },
              { value: "low-high", label: "Low to High" },
              { value: "high-low", label: "High to Low" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors ${
                  sortBy === option.value ? "bg-accent/20" : "hover:bg-muted"
                }`}
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => onSortChange(e.target.value as any)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-3 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  )
}
