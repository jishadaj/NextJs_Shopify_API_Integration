import React from "react";

export default function SkeletonHero() {
  return (
    <div className="animate-pulse w-full h-[400px] bg-gray-300 rounded-lg flex flex-col items-center justify-center p-8">
      <div className="w-3/4 h-12 bg-gray-400 rounded mb-4"></div>
      <div className="w-2/3 h-6 bg-gray-400 rounded mb-6"></div>
      <div className="w-32 h-10 bg-gray-400 rounded"></div>
    </div>
  );
}
