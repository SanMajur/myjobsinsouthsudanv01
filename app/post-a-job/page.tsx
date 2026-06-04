// app/post-a-job/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import JobForm from "@/components/JobForm";

export default function PostJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // 🌟 REDIRECT: If not logged in, bounce them to login cleanly
        router.push("/login");
      } else {
        setCheckingAuth(false);
      }
    }
    checkUser();
  }, [router]);

  const handleCreate = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Session expired. Please log in again.");

      const jobPayload = {
        ...formData,
        user_id: user.id, // 🌟 Securely stamps user ID onto row
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

  if (checkingAuth) {
    return <p className="text-center py-20 text-slate-500 animate-pulse">Checking credentials...</p>;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Post a New Position</h1>
      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">{error}</div>}
      <JobForm onSubmit={handleCreate} isSubmitting={isSubmitting} />
    </main>
  );
}