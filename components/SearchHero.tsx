"use client"
import { useState } from "react";
import { RECENT_ROLE_SUGGESTIONS, LOCATION_SUGGESTIONS } from "@/lib/constants";

export default function SearchHero() {
  const [whatQuery, setWhatQuery] = useState("");
  const [whereQuery, setWhereQuery] = useState("");
  const [showWhatSuggestions, setShowWhatSuggestions] = useState(false);
  const [showWhereSuggestions, setShowWhereSuggestions] = useState(false);

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    // Implement search logic here, e.g., navigate to search results page with query parameters
    e.preventDefault();
    console.log("Searching for:", whatQuery, "in", whereQuery);
  };
  return (
    <section className="w-full border-b border-gray-100 bg-gray-50 py-12 px-4 md:py-16 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Find your next opportunity in South Sudan
        </h1>
        {/* Search form container */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 rounded-xl bg-white p-4 shadown-md border border-gray-200 md:flex-row md:items-center"
        >
          {/* What Input Block */}
          <div className="flex flex-1 flex-col gap-1">
            <label
              htmlFor="what"
              className="text-sm font-bold tracking-wider text-gray-700 md:hidden sr-only"
            >
              Search jobs by title, keywords, or company
            </label>
            <input
              type="text"
              placeholder="Job title, keywords, company"
              value={whatQuery}
              onChange={(e) => setWhatQuery(e.target.value)}
              onFocus={() => setShowWhatSuggestions(true)}
              onBlur={() => setTimeout(() => setShowWhatSuggestions(false), 200)}
              id="what"
              className="w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            {/* Suggestions dropdown List */}
            {showWhatSuggestions && (
              <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                {RECENT_ROLE_SUGGESTIONS.filter((item) =>
                  item.toLowerCase().includes(whatQuery.toLowerCase())
                ).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setWhatQuery(suggestion)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Vertical divider visible only on desktop */}
          <div className="hidden h-8 w-px md:block  bg-gray-200"></div>
          <div className="flex flex-1 flex-col gap-1">
            <label
              htmlFor="where"
              className="text-sm font-bold tracking-wider text-gray-700 md:hidden sr-only"
            >
              Search Jobs by City,state, region or location
            </label>
            <input
              type="text"
              placeholder="City, state, or remote"
              value={whereQuery}
              onChange={(e) => setWhereQuery(e.target.value)}
              onFocus={() => setShowWhereSuggestions(true)}
              onBlur={() => setTimeout(() => setShowWhereSuggestions(false), 200)}
              id="where"
              className="w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            {/* Suggestions dropdown List */}
            {showWhereSuggestions && (
              <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                {LOCATION_SUGGESTIONS.filter((item) =>
                  item.toLowerCase().includes(whereQuery.toLowerCase())
                ).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setWhereQuery(suggestion)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Submit Action Button */}
          <button className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white cursor-pointer hover:bg-blue-700 transition-colors md:w-auto" type="submit">
            Find jobs
          </button>
        </form>
      </div>
    </section>
  )
}