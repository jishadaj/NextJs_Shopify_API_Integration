import React from "react";

export default function SkeletonProductCard() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4 w-full h-[320px] flex flex-col">
      <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
      <div className="mt-4 h-6 w-3/4 bg-gray-300 rounded"></div>
      <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
    </div>
  );
}