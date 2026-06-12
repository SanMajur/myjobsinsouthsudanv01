import Link from "next/link";
import { Job } from "../types/job";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const isFresh = job.postedAt === "Today" || job.postedAt === "Yesterday";
  return (
    <Link href={`/jobs/${job.id}`} className="block mb-4 group">
      <article className="cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-500 hover:shadow-md flex flex-col justify-between sm:flex-row sm:items-center gap-4">

        {/* Left Side: Job Attributes */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-150">
            {job.title}
          </h3>
          <p className="text-sm font-medium text-gray-700 mt-1">{job.company}</p>
          <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
            📍 {job.location}
          </p>

          {job.salary && (
            <div className="mt-3 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
              💰 {job.salary}
            </div>
          )}
        </div>


        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-50 shrink-0">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide shadow-sm ${isFresh
                ? "bg-blue-50 text-blue-700 border border-blue-100 animate-pulse-once"
                : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}
          >
            {job.postedAt}
          </span>


          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 group-hover:bg-blue-600 text-xs font-semibold text-blue-600 group-hover:text-white transition-all duration-150 shadow-sm">
            View Details
            <span className="transform group-hover:translate-x-1 transition-transform duration-150">→</span>
          </span>
        </div>

      </article>
    </Link>
  );
}