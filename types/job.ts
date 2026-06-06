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

export type SupabaseJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description?: string;
  requirements?: string;
  apply_url?: string;
  created_at: string;
}