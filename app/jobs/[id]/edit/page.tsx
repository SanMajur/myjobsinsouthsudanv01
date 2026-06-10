// app/jobs/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import JobForm from '@/components/JobForm';
import { Trash2, AlertTriangle } from 'lucide-react'; // Quick, clear icons for safety actions

interface JobFormData {
  id?: string;
  title: string;
  company: string;
  location: string;
  description: string;
  apply_url: string;
}

export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState<JobFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobAndVerifyOwner() {
      try {
        if (!id) return;
        setLoading(true);

        // 1. Get current logged-in user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          router.push(`/signup?redirect=/jobs/${id}/edit`);
          return;
        }

        // 2. Fetch the specific job listing from the database
        const { data: jobData, error: jobError } = await supabase
          .from('Job')
          .select('*')
          .eq('id', id)
          .single();

        if (jobError || !jobData) {
          setError('Job listing not found.');
          return;
        }

        // 🛡️ BACKEND EQUALITY CHECK: Double check if this user owns this job post
        if (jobData.user_id !== user.id) {
          setError('Security Exception: You do not have permission to edit this listing.');
          return;
        }

        // 3. Map database fields to fill out our Form's expected interface structures
        setInitialData({
          id: jobData.id,
          title: jobData.title,
          company: jobData.company,
          location: jobData.location,
          description: jobData.description,
          apply_url: jobData.apply_url || '',
        });

      } catch (err) {
        console.error('Failed to load edit configurations:', err);
        setError('An unexpected error occurred while hydrating data fields.');
      } finally {
        setLoading(false);
      }
    }

    loadJobAndVerifyOwner();
  }, [id, router]);

  // 🔄 Update Handler: Sends modifications straight to your Supabase engine
  const handleJobUpdate = async (updatedFields: JobFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('Job')
        .update({
          title: updatedFields.title,
          company: updatedFields.company,
          location: updatedFields.location,
          description: updatedFields.description,
          apply_url: updatedFields.apply_url,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // 🏁 Success redirection directly back to the recruiter dashboard tracking node
      router.push('/dashboard/recruiter');
    } catch (err: any) {
      console.error('Update operation failed:', err);
      setError(err.message || 'Database update rejected.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🗑️ Delete Handler: Purges the record safely
  const handleJobDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('Job')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Send them straight back to their dashboard panel upon removal
      router.push('/dashboard/recruiter');
    } catch (err: any) {
      console.error('Delete execution error:', err);
      setError(err.message || 'Could not complete deletion target request.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Retrieving post attributes from database stream...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-white border border-slate-100 rounded-xl shadow-sm text-center">
        <p className="text-red-500 font-semibold mb-4">⚠️ {error}</p>
        <button
          onClick={() => router.push('/dashboard/recruiter')}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4">
      <div className="max-w-2xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Modify Job Listing
          </h1>
          <p className="text-sm text-slate-500">
            Update credentials, operational fields, or remove the role completely.
          </p>
        </div>
        
        {/* Quick Back-to-Dashboard escape link */}
        <button
          onClick={() => router.push('/dashboard/recruiter')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 bg-white rounded-lg px-3 py-2 shadow-sm transition self-start sm:self-center cursor-pointer"
        >
          ← Cancel Changes
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Main Modification Form Wrapper */}
        {initialData && (
          <JobForm
            initialData={initialData}
            onSubmit={handleJobUpdate}
            isSubmitting={isSubmitting}
          />
        )}

        {/* 🚨 DANGER ZONE PANEL: Integrated safely underneath the form parameters */}
        <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
          {!showDeleteConfirm ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Danger Zone</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Once deleted, this job post is gone forever. This cannot be undone.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-600 px-4 py-2.5 transition shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Trash2 size={14} />
                Delete Position Listing
              </button>
            </div>
          ) : (
            <div className="bg-red-50/50 border border-red-200 rounded-lg p-4">
              <div className="flex gap-2 text-red-700">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold">Are you absolutely sure?</h4>
                  <p className="text-xs mt-1 text-red-600/90 leading-relaxed">
                    This will immediately purge the listing from the public feed. All job seeker views, links, and associated analytical tracking data will be permanently wiped.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 justify-end">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-50"
                >
                  No, Keep Listing
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleJobDelete}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 shadow-sm transition cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? "Purging Record..." : "Yes, Delete Permanently"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}