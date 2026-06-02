import { Job } from "../types/job";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <article  className="cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-500 hover:shadow-md">
                <h3 className="text-lg font-bold text-blue-600 hover:underline">
                  {job.title}
                </h3>
                <p className="text-sm font-medium text-gray-700 mt-1">{job.company}</p>
                <p className="text-sm text-gray-500 mt-0 5">{job.location}</p>
                {job.salary && (
                  <div className="mt-2 inline-block rounded bg-gray-100 px-2 py-0.5 text-sm font-semibold text-gray-700">
                    {job.salary}
                  </div>
                )}
                <p className="text-sm text-gray-400 mt-4">{job.postedDate}</p>
              </article>
    )
}