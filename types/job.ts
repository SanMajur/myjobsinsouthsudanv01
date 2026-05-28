export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    salary?: number;
    employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
    postedDate: Date;
}