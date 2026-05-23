// lib/fakeJobs.ts
import { Job } from '@/types/job'

export const fakeJobs: Job[] = [
  {
    id: 1,
    title: "Driver",
    company: "UNMISS",
    location: "Juba",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRemote: false,
    employmentType: "Full-time",
    salary: 800
  },
  {
    id: 2,
    title: "Finance Assistant",
    company: "Save the Children",
    location: "Juba", 
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isRemote: false,
    employmentType: "Full-time",
    salary: 1200
  },
  {
    id: 3,
    title: "M&E Officer",
    company: "UNICEF",
    location: "Wau",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isRemote: true,
    employmentType: "Contract",
  }
]