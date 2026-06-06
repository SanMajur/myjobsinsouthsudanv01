// app/page.tsx
'use client';

import { useEffect, useState } from "react";
import SearchHero from "@/components/SearchHero";
import JobFeed from "@/components/JobFeed";
import FeedHeader from "@/components/FeedHeader";
import { Job, SupabaseJob } from "@/types/job";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeWhat, setActiveWhat] = useState("");
  const [activeWhere, setActiveWhere] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async (whatString: string, whereString: string) => {
      try {
        // Safe state checking: only update if not already loading
        if (isMounted) {
          setError(null);
        }

        let query = supabase.from('Job').select('*').order('created_at', { ascending: false });

        if (whatString) {
          query = query.or(`title.ilike.%${whatString}%,company.ilike.%${whatString}%`);
        }
        if (whereString) {
          query = query.ilike('location', `%${whereString}%`);
        }

        const { data, error: supabaseError } = await query;
        if (supabaseError) throw supabaseError;

        if (!isMounted) return; // Stop execution if user navigated away or changed search mid-flight

        const formattedJobs: Job[] = (data || []).map((job: SupabaseJob) => ({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary || undefined,
          description: job.description || "",
          requirements: job.requirements || "",
          apply_url: job.apply_url || "",
          postedAt: new Date(job.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        }));

        setJobs(formattedJobs);
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching jobs:", err);
          setError('Failed to fetch jobs');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

  // Trigger the loading state safely before invoking the async thread
      Promise.resolve().then(() => {
        if (isMounted) setLoading(true);
        fetchJobs(activeWhat, activeWhere);
      });
  
      // CLEANUP FUNCTION: Prevents cascading race conditions
      return () => {
        isMounted = false;
      };
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
      <SearchHero onSearch={handleSearchSubmit} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <FeedHeader activeWhat={activeWhat} activeWhere={activeWhere} onClear={handleClearFilters} />
        
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