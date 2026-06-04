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
      // 🌟 GET THE LOGGED-IN USER: Fetch active session data safely
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("You must be logged in to post a position.");
      }

      // Attach the secure user token identity directly to the record payload
      const jobPayload = {
        ...formData,
        user_id: user.id, 
      };

      const { error: supabaseError } = await supabase
        .from("Job")
        .insert([jobPayload]);

      if (supabaseError) throw supabaseError;

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to publish job posting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Post a New Position</h1>
      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">{error}</div>}
      <JobForm onSubmit={handleCreate} isSubmitting={isSubmitting} />
    </main>
  );
}