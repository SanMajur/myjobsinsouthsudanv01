'use client';
import { mockJobs } from "@/lib/mockJobs";
import { useState } from "react";
import SearchHero from "@/components/SearchHero";
import JobFeed from "@/components/JobFeed";
import FeedHeader from "@/components/FeedHeader";


export default function HomePage() {
  const [activeWhat, setActiveWhat] = useState("");
  const [activeWhere, setActiveWhere] = useState("");

  const handleSearchSubmit = (what: string, where: string) => {
    setActiveWhat(what);
    setActiveWhere(where);
  };

  const handleClearFilters = () => {
    setActiveWhat("");
    setActiveWhere("");
  };

  const filteredJobs = mockJobs.filter((job) => {
    const matchesWhat = job.title.toLowerCase().includes(activeWhat.toLowerCase()) || job.company.toLowerCase().includes(activeWhat.toLowerCase());
    const matchesWhere = job.location.toLowerCase().includes(activeWhere.toLowerCase());
    return matchesWhat && matchesWhere;
  });
  return (
    <div className="w-full">
      {/*Render our self-contained interactive search component */}
      <SearchHero onSearch={handleSearchSubmit} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <FeedHeader activeWhat={activeWhat} activeWhere={activeWhere} onClear={handleClearFilters} />
        {/* Render dynamic filtered list */}
        <JobFeed jobs={filteredJobs} />
      </main>
    </div>
  );
}
