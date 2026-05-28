import { Job } from "@/types/job";

const fakeJobs: Job[]= [
    {
        id: 1,
        title: "Software Engineer",
        company: "Tech Solutions Ltd.",
        location: "Juba",
        salary: 'Negotiable',
        employmentType: "Full-time",
        postedDate: "2 days ago"
    },
    {
        id: 2,
        title: "Project Manager",
        company: "Global Aid Organization",
        location: "Malakal",
        employmentType: "Contract",
        postedDate: "5 days ago"
    },
    {
        id: 3,
        title: "Data Analyst",
        company: "Data Insights Inc.",
        location: "Wau",
        salary: 'Negotiable',
        employmentType: "Part-time",
        postedDate: "10 days ago"
    }
];

export default fakeJobs;