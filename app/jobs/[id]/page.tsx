"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import TruncatedDescription from '@/components/TruncatedDescription';
import type { User } from '@supabase/supabase-js';

// 💡 1. Explicit Domain Structural Interface
interface JobListing {
  id: string;
  title: string;
  company: string;
  description: string | null;
  user_id: string;
  application_url?: string;
  apply_url?: string;
}

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  // Applied explicit interface typing to guarantee compile-time protection
  const [job, setJob] = useState<JobListing | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initPage() {
      try {
        if (!id) return;

        // Fetch Job Data safely from Supabase
        const { data: jobData, error: jobError } = await supabase
          .from('Job')
          .select('*')
          .eq('id', id)
          .single();

        if (jobError || !jobData) {
          console.error("Error fetching job:", jobError);
          setLoading(false);
          return;
        }
        setJob(jobData as JobListing);

        // Fetch authenticated session securely
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (!authError && user) {
          setCurrentUser(user);
        }
      } catch (err) {
        console.error("Critical hydration error:", err);
      } finally {
        setLoading(false);
      }
    }

    initPage();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-slate-500 animate-pulse">Loading workspace...</div>;
  if (!job) return <div className="text-center py-20 text-slate-600 font-medium">Listing Not Found</div>;

  // 🌟 Clean ownership validation flag
  const isOwner = !!(currentUser && currentUser.id === job.user_id);

  const applicationTarget = job.application_url || job.apply_url || "";
  const isEmail = applicationTarget.includes('@') && !applicationTarget.startsWith('http');
  const applyLink = isEmail ? `mailto:${applicationTarget}` : applicationTarget;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-6">
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition">
          ← Back to Feed
        </Link>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">{job.title}</h1>
            <p className="text-lg text-slate-600 font-medium">{job.company}</p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-row items-center gap-3">
            {/* Owner UI Customization */}
            {isOwner ? (
              <Link
                href={`/jobs/${job.id}/edit`}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 transition text-sm font-medium shadow-sm"
              >
                Edit Post Settings
              </Link>
            ) : (
              applicationTarget && (
                <a 
                  href={applyLink} 
                  target={isEmail ? '_self' : '_blank'} 
                  rel="noopener noreferrer" 
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition shadow-sm"
                >
                  Apply Now
                </a>
              )
            )}
          </div>
        </div>
        
        <div className="prose prose-slate max-w-none">
          <h3 className="text-base font-semibold text-slate-900 mb-3 uppercase tracking-wider">Job Description</h3>
          <TruncatedDescription text={job.description || "No description provided."} characterLimit={350} />
        </div>
      </div>
    </div>
  );
}