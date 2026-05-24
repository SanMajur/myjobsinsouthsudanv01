// app/page.tsx
import { fakeJobs } from '@/lib/fakeJobs'
import { JobCard } from '@/components/JobCard'

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        NGO Jobs South Sudan
      </h1>
      
      <div className="space-y-4">
        {fakeJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </main>
  )
}