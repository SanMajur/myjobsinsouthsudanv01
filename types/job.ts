export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    salary?: string;
    employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
    postedDate: string;
}