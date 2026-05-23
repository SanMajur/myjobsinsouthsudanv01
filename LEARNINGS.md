### Template for daily entry
## 22-05-2026 - Day 0
- **Learned:** How to install a NEXT.js project with TypeScript + Tailwind using `npx create-next-app/latest
- **Shipped:** Cleaned biolerplate in app/page.tsx and got localhost:3000 running
- **Next:** Create types/jobs.ts and write my first Job interface

## 23-05-2026 - Day 1
### What I Learned:
- Learned: Use `interface Job` in `types/job.ts` to model data shape for job listings. Interface = blueprint for one object.
- Learned: To show multiple jobs, use `Job[]` array type. Arrays enable `.map()`, `.filter()`, `.length` for rendering lists.
- Learned: JS is dynamically typed which causes silent bugs like `age = "Santino"` after `age = 20`. TypeScript enforces explicit types to catch these before runtime.
- Learned: To reuse types across files, `export interface Job` in `job.ts` then `import { Job } from '@/types/job'` where needed.
- Learned: Ignored TS warning "number not assignable to string". Browser crashed with "toUpperCase is not a function" because 123 is number. Only strings have .toUpperCase(). Interface Job forces title: string to prevent runtime crashes.
- Learned: Only strings have .toUpperCase(). Numbers don't. Interface Job forces title: string to prevent this bug.
- Learned: Importing Job[] gives me autocomplete on job.title, job.company. TS errors if I typo.
### Win:
Understand TS prevents production bugs.