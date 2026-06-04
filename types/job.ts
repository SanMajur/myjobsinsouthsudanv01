export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  salary?: string;
  description: string;
  requirements: string;
  apply_url: string;
}