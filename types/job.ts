export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAt: string;
  salary?: string;
  description: string;
  requirements: string;
  apply_url: string;
}