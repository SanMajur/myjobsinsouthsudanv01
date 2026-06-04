// app/jobs/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import JobForm from "@/components/JobForm";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      const { data, error: fetchError } = await supabase
        .from("Job")
        .select("*")
        .eq("id", id)
        .single();
        
      if (data) {
        // Map application_url to apply_url if your JobForm specifically relies on initialData.apply_url
        setJob({
          ...data,
          apply_url: data.application_url || data.apply_url || "",
        });
      }
      setLoading(false);
    };
    if (id) fetchJob();
  }, [id]);

  const handleUpdate = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);

    // Prepare the payload to match your exact database column naming structure
    const updatePayload = {
      title: formData.title,
      company: formData.company,
      location: formData.location,
      description: formData.description,
      // Map both variations to be absolutely safe
      apply_url: formData.apply_url ||  "",
    };

    try {
      const { error: updateError } = await supabase
        .from("Job")
        .update(updatePayload)
        .eq("id", id);

      if (updateError) throw updateError;

      // Force Next.js to dump cached values and pull the updated row freshly from the DB
      router.push(`/jobs/${id}`);
      router.refresh();
    } catch (err: any) {
      console.error("Update failed:", err.message);
      setError(err.message || "Failed to save updates.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-10 text-slate-500">Loading job details...</p>;
  if (!job) return <p className="text-center py-10 text-red-500">Job listing not found.</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Listing</h1>
        <p className="text-sm text-gray-500 mt-1">Modify the fields below to update this position live.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-600">
          ⚠️ Error saving updates: {error}
        </div>
      )}

      <JobForm initialData={job} onSubmit={handleUpdate} isSubmitting={isSubmitting} />
    </div>
  );
}