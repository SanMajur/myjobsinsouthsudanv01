'use client';
import { mockJobs } from "@/lib/mockJobs";
import { useEffect, useState } from "react";
import SearchHero from "@/components/SearchHero";
import JobFeed from "@/components/JobFeed";
import FeedHeader from "@/components/FeedHeader";
import { Job } from "@/types/job";
import { supabase } from "@/lib/supabase";


export default function HomePage() {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeWhat, setActiveWhat] = useState("");
  const [activeWhere, setActiveWhere] = useState("");

  // Function to pull filtered jobs from the database based on search criteria
  const fetchJobs = async (whatString: string, whereString: string) => {
    try {
      setLoading(true);
      setError(null);

      // Target Supabase could table and sort freshest entries
      let query = supabase.from('Job').select('*').order('created_at', { ascending: false });

      // Apply filters if provided
      if (whatString) {
        query = query.ilike('title', `%${whatString}%`).or(`company.ilike.%${whatString}%`);
      }
      if (whereString) {
        query = query.ilike('location', `%${whereString}%`);
      }

      const { data, error: supabaseError } = await query;
      if (supabaseError) {
        throw supabaseError;
      }

      const formattedJobs: Job[] = (data || []).map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary || undefined,
        postedDate: new Date(job.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }));

      setJobs(formattedJobs);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(activeWhat, activeWhere);
  }, [activeWhat, activeWhere]);

  const handleSearchSubmit = (what: string, where: string) => {
    setActiveWhat(what);
    setActiveWhere(where);
  };

  const handleClearFilters = () => {
    setActiveWhat("");
    setActiveWhere("");
  };


  return (
    <div className="w-full">
      {/*Render our self-contained interactive search component */}
      <SearchHero onSearch={handleSearchSubmit} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <FeedHeader activeWhat={activeWhat} activeWhere={activeWhere} onClear={handleClearFilters} />
        {/* Render dynamic filtered list */}
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
