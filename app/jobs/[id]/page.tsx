// app/jobs/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import TruncatedDescription from '@/components/TruncatedDescription';

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initPage() {
      // 1. Fetch Job Data
      const { data: jobData } = await supabase.from('Job').select('*').eq('id', id).single();
      setJob(jobData);

      // 2. Fetch Active Session Identity
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);

      setLoading(false);
    }
    if (id) initPage();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!job) return <div className="text-center py-20">Listing Not Found</div>;

  // 🌟 SECURITY CHECK: Is the current visitor the person who posted this?
  const isOwner = currentUser && currentUser.id === job.user_id;

  const applicationTarget = job.application_url || job.apply_url || "";
  const isEmail = applicationTarget.includes('@') && !applicationTarget.startsWith('http');
  const applyLink = isEmail ? `mailto:${applicationTarget}` : applicationTarget;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-4">
        <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
          ← Back to Feed
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
            <p className="text-lg text-slate-600 font-medium">{job.company}</p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-row items-center gap-3">
            {/* 🌟 CONDITIONAL RENDERING: Only display Edit button if the user owns this row! */}
            {isOwner && (
              <Link
                href={`/jobs/${job.id}/edit`}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 transition text-sm font-medium"
              >
                Edit Post
              </Link>
            )}

            {applicationTarget && (
              <a href={applyLink} target={isEmail ? '_self' : '_blank'} rel="noopener noreferrer" className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                Apply Now
              </a>
            )}
          </div>
        </div>
        <div className="prose prose-slate max-w-none">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Job Description</h3>
          {/* 🌟 ABSTRACTED INTERACTIVE DESCRIPTION */}
          <TruncatedDescription text={job.description || "No description provided."} characterLimit={350} />
        </div>
      </div>
    </div>
  );
}