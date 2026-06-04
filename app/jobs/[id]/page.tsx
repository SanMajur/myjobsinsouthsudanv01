// app/jobs/[id]/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import TruncatedDescription from '@/components/TruncatedDescription';

interface JobDetailsProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function JobDetailsPage({ params }: JobDetailsProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data: job, error } = await supabase
    .from('Job') 
    .select('*')
    .eq('id', id)
    .single();

  if (error || !job) {
    return (
      <div className="text-center py-20 px-4 max-w-md mx-auto font-sans">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Listing Not Found</h2>
        <p className="text-slate-500 mb-6">This job listing does not exist or may have been removed.</p>
        <Link href="/" className="inline-flex justify-center bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
          Back to Feed
        </Link>
      </div>
    );
  }

  const applicationTarget = job.apply_url || "";
  const isEmail = applicationTarget.includes('@') && !applicationTarget.startsWith('http');
  const applyLink = isEmail ? `mailto:${applicationTarget}` : applicationTarget;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 font-sans">
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
            <p className="text-sm text-slate-400 mt-1">📍 {job.location}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-row items-center gap-3">
            <Link 
              href={`/jobs/${job.id}/edit`}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 transition font-medium text-sm text-center"
            >
              Edit Post
            </Link>
            
            {applicationTarget && (
              <a 
                href={applyLink}
                target={isEmail ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm text-center shadow-sm"
              >
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