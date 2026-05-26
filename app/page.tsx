
import { JobCard } from '@/components/JobCard'
import SearchJobs from '@/components/SearchJobs'
import { fakeJobs } from '@/lib/fakeJobs'

export default function Home() {
  const filteredJobs = fakeJobs

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Indeed-style Hero + Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                MyJobsInSouthSudan
              </h1>
              <p className="text-gray-600">Real NGO jobs in Juba. No scams.</p>
            </div>

            {/* Search Bar - Indeed Style */}
            <SearchJobs />
          </div>
        </div>
      </div>

      {/* Job List - Indeed Style */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredJobs.length} jobs in South Sudan
          </p>
        </div>

        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <p className="text-gray-600">No jobs found. Try different search.</p>
            </div>
          )}
        </div>

        {/* Indeed-style Post Job CTA */}
        <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-100 text-center space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Employers</h3>
          <p className="text-gray-600">Post jobs free. Reach qualified candidates in Juba.</p>
          <a 
            href="https://wa.me/211921880822?text=I%20want%20to%20post%20a%20job"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
          >
            Post a Job on WhatsApp
          </a>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500 space-y-2 pb-8">
          <p>Built in Juba for South Sudan</p>
          <p>WhatsApp: +211 921 880 822</p>
        </footer>
      </div>
    </main>
  )
}