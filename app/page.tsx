"use client";
import { getDaysAgo } from "@/utils/date";
import { Job } from "@/types/job";

// Job[] = tells TS "this must be an array of Job objects"
const fakeJobs: Job[] = [
  {
    id: "1",
    title: "Accountant",
    company: "Equity Bank",
    location: "Juba, South Sudan",
    postedAt: new Date("2024-06-01"),
    isRemote: true,
  },
  {
    id: "2",
    title: "Driver",
    company: "UN Mission",
    location: "Wau, South Sudan",
    postedAt: new Date("2024-06-02"),
    isRemote: false,
  },
];

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-3xl">Job Listings</h1>
      <ul>
        {fakeJobs.map((job) => (
          <li key={job.id}>
            <h2 className="font-bold">{job.title}</h2>
            <p>
              {job.company} • {job.location}
            </p>

            {job.isRemote && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                Remote
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
