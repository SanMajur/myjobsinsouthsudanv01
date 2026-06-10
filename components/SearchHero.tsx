// components/SearchHero.tsx
"use client";
import { useState } from "react";
import { RECENT_ROLE_SUGGESTIONS, LOCATION_SUGGESTIONS } from "@/lib/constants";
import { Search, MapPin } from "lucide-react";

interface SearchHeroProps {
  onSearch: (what: string, where: string) => void;
}

export default function SearchHero({ onSearch }: SearchHeroProps) {
  const [whatQuery, setWhatQuery] = useState("");
  const [whereQuery, setWhereQuery] = useState("");
  const [showWhatSuggestions, setShowWhatSuggestions] = useState(false);
  const [showWhereSuggestions, setShowWhereSuggestions] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    if (!whatQuery.trim() && !whereQuery.trim()) {
      setValidationError("Please enter a job title or location to search.");
      return;
    }
    setValidationError(null);
    onSearch(whatQuery.trim(), whereQuery.trim());
    
    // 🌟 REMOVED: Wiping state inputs here was causing component decoupling!
  };

  return (
    <section className="w-full border-b border-gray-100 py-12 px-4 md:py-16 md:px-8 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mb-6 text-3xl font-black tracking-tight text-gray-900 md:text-5xl">
          Find your next opportunity in South Sudan
        </h1>
        
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-lg border border-gray-200 md:flex-row md:items-center"
        >
          {/* What Input Block */}
          <div className="relative flex flex-1 flex-col gap-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center">
              <Search size={18} />
            </div>
            <input
              type="text"
              autoComplete="off"
              placeholder="Job title, keywords, company"
              value={whatQuery}
              onChange={(e) => {
                setWhatQuery(e.target.value);
                if (validationError) setValidationError(null);
              }}
              onFocus={() => setShowWhatSuggestions(true)}
              onBlur={() => setTimeout(() => setShowWhatSuggestions(false), 200)}
              id="what"
              className={`w-full h-11 pl-10 pr-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 ${
                validationError && !whatQuery && !whereQuery ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            
            {/* Suggestions Dropdown */}
            {showWhatSuggestions && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg max-h-60 overflow-y-auto">
                {RECENT_ROLE_SUGGESTIONS.filter((item) =>
                  item.toLowerCase().includes(whatQuery.toLowerCase())
                ).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onMouseDown={() => setWhatQuery(suggestion)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden h-8 w-px md:block bg-gray-200"></div>

          {/* Where Input Block */}
          <div className="relative flex flex-1 flex-col gap-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center">
              <MapPin size={18} />
            </div>
            <input
              type="text"
              autoComplete="off"
              placeholder="City, state, or remote"
              value={whereQuery}
              onChange={(e) => {
                setWhereQuery(e.target.value);
                if (validationError) setValidationError(null);
              }}
              onFocus={() => setShowWhereSuggestions(true)}
              onBlur={() => setTimeout(() => setShowWhereSuggestions(false), 200)}
              id="where"
              className={`w-full h-11 pl-10 pr-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 ${
                validationError && !whatQuery && !whereQuery ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />

            {/* Suggestions Dropdown */}
            {showWhereSuggestions && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg max-h-60 overflow-y-auto">
                {LOCATION_SUGGESTIONS.filter((item) =>
                  item.toLowerCase().includes(whereQuery.toLowerCase())
                ).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onMouseDown={() => setWhereQuery(suggestion)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className="w-full rounded-lg bg-blue-600 px-6 h-11 text-sm font-semibold text-white cursor-pointer hover:bg-blue-700 transition-colors md:w-auto shrink-0 shadow-sm" 
            type="submit"
          >
            Find jobs
          </button>
        </form>

        {validationError && (
          <p className="mt-4 text-sm font-semibold text-red-500 text-center">{validationError}</p>
        )}
      </div>
    </section>
  );
}