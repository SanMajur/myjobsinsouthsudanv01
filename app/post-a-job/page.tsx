// app/post-a-job/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import JobForm from "@/components/JobForm";

export default function PostJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from("Job")
        .insert([formData]);

      if (supabaseError) throw supabaseError;

      router.push("/");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to publish job posting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Post a New Position</h1>
        <p className="text-sm text-gray-500 mt-1">Fill out the details below to broadcast your opening across South Sudan.</p>
      </div>

      {error && (
        <div className="mb-6 max-w-2xl mx-auto rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-600">
          ⚠️ Error: {error}
        </div>
      )}

      <JobForm onSubmit={handleCreate} isSubmitting={isSubmitting} />
    </main>
  );
}