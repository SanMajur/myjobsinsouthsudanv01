export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedAt: Date;
  isRemote: boolean; 
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary?: number;
}
