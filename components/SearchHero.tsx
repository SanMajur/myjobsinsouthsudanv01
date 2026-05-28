"use client"
import { useState } from "react";

export default function SearchHero() {
      const [whatQuery, setWhatQuery] = useState("");
  const [whereQuery, setWhereQuery] = useState("");

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
                What
              </label>
              <input
                type="text"
                placeholder="Job title, keywords, company"
                value={whatQuery}
                onChange={(e) => setWhatQuery(e.target.value)}
                id="what"
                className="w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
            {/* Vertical divider visible only on desktop */}
            <div className="hidden h-8 w-px md:block  bg-gray-200"></div>
             <div className="flex flex-1 flex-col gap-1">
              <label
                htmlFor="where"
                className="text-sm font-bold tracking-wider text-gray-700 md:hidden sr-only"
              >
                Where
              </label>
              <input
                type="text"
                placeholder="City, state, or remote"
                value={whereQuery}
                onChange={(e) => setWhereQuery(e.target.value)}
                id="where"
                className="w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
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