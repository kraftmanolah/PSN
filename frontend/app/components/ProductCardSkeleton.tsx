"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-sm mx-auto md:max-w-xs animate-pulse">
      <div className="bg-gray-200 h-48 rounded-lg"></div>
      <div className="mt-4 space-y-2">
        <div className="bg-gray-200 h-4 w-3/4 mx-auto rounded"></div>
        <div className="bg-gray-200 h-4 w-1/2 mx-auto rounded"></div>
      </div>
    </div>
  );
}