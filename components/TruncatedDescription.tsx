// components/TruncatedDescription.tsx
"use client";

import { useState } from "react";

interface TruncatedDescriptionProps {
  text: string;
  characterLimit?: number;
}

export default function TruncatedDescription({ text, characterLimit = 300 }: TruncatedDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // If the description is already short, don't show the toggle button
  if (!text || text.length <= characterLimit) {
    return <p className="text-slate-600 whitespace-pre-line leading-relaxed">{text}</p>;
  }

  // Handle truncation slicing
  const displayedText = isExpanded ? text : `${text.slice(0, characterLimit)}...`;

  return (
    <div className="space-y-3">
      <p className="text-slate-600 whitespace-pre-line leading-relaxed transition-all duration-300">
        {displayedText}
      </p>
      
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 transition focus:outline-none"
      >
        {isExpanded ? (
          <>
            Show Less <span className="ml-1">↑</span>
          </>
        ) : (
          <>
            Read More <span className="ml-1">↓</span>
          </>
        )}
      </button>
    </div>
  );
}