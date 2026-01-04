"use client"

import React from "react"

interface ProductSkeletonProps {
  count?: number
}

function ProductSkeleton({ count = 6 }: ProductSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-lg overflow-hidden border border-border flex flex-col animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="bg-muted h-48" />

          {/* Content Skeleton */}
          <div className="flex flex-col flex-grow p-4 space-y-3">
            {/* Title */}
            <div className="h-5 bg-muted rounded w-3/4" />
            
            {/* Category */}
            <div className="h-3 bg-muted rounded w-1/3" />
            
            {/* Stock */}
            <div className="h-3 bg-muted rounded w-1/4" />
            
            {/* Button */}
            <div className="h-10 bg-muted rounded w-full mt-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(ProductSkeleton)
