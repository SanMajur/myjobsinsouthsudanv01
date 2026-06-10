// app/page.tsx
'use client';

import SearchHero from "@/components/SearchHero";
import JobFeed from "@/components/JobFeed";
import FeedHeader from "@/components/FeedHeader";
import { useJobs } from "../hooks/useJobs";

export default function HomePage() {
  const {
    jobs,
    loading,
    error,
    activeWhat,
    activeWhere,
    handleSearchSubmit,
    handleClearFilters,
  } = useJobs();

  return (
    <div className="w-full">
      <SearchHero onSearch={handleSearchSubmit} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <FeedHeader 
          activeWhat={activeWhat} 
          activeWhere={activeWhere} 
          onClear={handleClearFilters} 
        />
        
        {loading ? (
          <p className="text-center text-sm font-medium text-gray-500 animate-pulse py-10">
            Fetching active listings from the database...
          </p>
        ) : error ? (
          <p className="text-center text-sm font-semibold text-red-500 bg-red-50 p-4 border border-red-200 rounded-xl">
            ⚠️ {error}
          </p>
        ) : (
          <JobFeed jobs={jobs} />
        )}
      </main>
    </div>
  );
}