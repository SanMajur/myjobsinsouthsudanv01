// components/JobCard.tsx
import { Job } from "@/types/job";
import { getDaysAgo } from "@/utils/date";

type JobCardProps = { job: Job };

export function JobCard({ job }: JobCardProps) {
  const daysAgo = getDaysAgo(job.postedAt);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ">
      {/* Header: Title + Remote badge */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
        {job.isRemote && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Remote
          </span>
        )}
      </div>

      {/* Company + Location */}
      <p className="text-gray-700 mb-2">
        {job.company} • {job.location}
      </p>

      {/* Footer: Type + Salary + Date */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            {job.employmentType}
          </span>
          {job.salary && (
            <span className="text-gray-600">${job.salary}/mo</span>
          )}
        </div>
        <span className="text-gray-500">
          {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
        </span>
      </div>
    </div>
  );
}
