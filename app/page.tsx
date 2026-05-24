"use client";
import { useState } from "react";
import { fakeJobs } from "@/lib/fakeJobs";
import { JobCard } from "@/components/JobCard";

export default function Home() {
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);

  const filteredJobs = showRemoteOnly
    ? fakeJobs.filter((job) => job.isRemote)
    : fakeJobs;
  return (
    <main className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        NGO Jobs South Sudan
      </h1>
      <button
        onClick={() => setShowRemoteOnly(!showRemoteOnly)}
        className={`mb-6 px-4 py-2 rounded-lg font-medium transition-colors appearance-none
    ${
      showRemoteOnly
        ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
        : "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900"
    }`}
      >
        {showRemoteOnly ? "Showing Remote Only" : "Show Remote Only"}
      </button>
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}
