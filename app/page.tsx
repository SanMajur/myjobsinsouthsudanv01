'use client';
import { Job } from '@/types/job';

// Job[] = tells TS "this must be an array of Job objects"
const fakeJobs: Job[] = [
  {
    id: '1',
    title: "Accountant",
    company: "Equity Bank",
    location: "Juba, South Sudan",
    postedAt: new Date('2024-06-01'),
  },
  {
    id: '2', 
    title: "Driver",
    company: "UN Mission",
    location: "Wau, South Sudan",
    postedAt: new Date('2024-06-02'),
  }
];

export default function Home() {
  const now = new Date();
  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {fakeJobs.map((job) => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.postedAt.toLocaleDateString()}</p>
            <p>Posted: {job.postedAt.toDateString()}</p>  
            <p>Posted {Math.floor((now.getTime() - job.postedAt.getTime()) / 86400000)} days ago </p>
          </li>
        ))}
      </ul>
     

    </div>
  );
}