// lib/services/jobService.ts
import { supabase } from "@/lib/supabase";
import { Job, SupabaseJob } from "@/types/job";
import {formatRelativeTime} from "@/lib/utils/date";

/**
 * Formats a raw database row into a standardized UI Job object.
 */
export const formatJobData = (job: SupabaseJob): Job => ({
  id: job.id,
  title: job.title,
  company: job.company,
  location: job.location,
  salary: job.salary || undefined,
  description: job.description || "",
  requirements: job.requirements || "",
  apply_url: job.apply_url || "",
  postedAt: formatRelativeTime(new Date(job.created_at)),
});

/**
 * Fetches filtered job records from Supabase
 */
export async function fetchFilteredJobs(what?: string, where?: string): Promise<Job[]> {
  let query = supabase
    .from('Job')
    .select('*')
    .order('created_at', { ascending: false });

  if (what) {
    query = query.or(`title.ilike.%${what}%,company.ilike.%${what}%`);
  }
  if (where) {
    query = query.ilike('location', `%${where}%`);
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map(formatJobData);
}