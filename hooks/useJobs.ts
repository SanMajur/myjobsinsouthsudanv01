// hooks/useJobs.ts
import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { fetchFilteredJobs } from "@/lib/services/jobService";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeWhat, setActiveWhat] = useState("");
  const [activeWhere, setActiveWhere] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }
        
        const data = await fetchFilteredJobs(activeWhat, activeWhere);
        
        if (isMounted) {
          setJobs(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error context inside useJobs hook:", err);
          setError("Failed to fetch jobs");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadJobs();

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

  return {
    jobs,
    loading,
    error,
    activeWhat,
    activeWhere,
    handleSearchSubmit,
    handleClearFilters,
  };
}