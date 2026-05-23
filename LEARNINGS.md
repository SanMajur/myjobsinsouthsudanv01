### Template for daily entry
## 22-05-2026 - Day 0
- **Learned:** How to install a NEXT.js project with TypeScript + Tailwind using `npx create-next-app/latest
- **Shipped:** Cleaned biolerplate in app/page.tsx and got localhost:3000 running
- **Next:** Create types/jobs.ts and write my first Job interface


## 23-05-2026 - Day 1

### **Win:** 
Shipped `postedAt: Date` with hydration fix. TS prevented 6 runtime crashes before code hit browser.

### **TypeScript: Types Prevent Runtime Bugs**
- **Interface = Blueprint**: `interface Job` in `types/job.ts` defines required shape. Forces every job to have `id`, `title`, `company`, `location`, `postedAt`, `isRemote`.
- **Arrays of Objects**: `Job[]` enables `.map()`, `.filter()`, `.length`. One `Job` = object, `Job[]` = list.
- **Import/Export**: `export interface Job` → `import { Job } from '@/types/job'`. Gives autocomplete, catches typos like `job.tilte`.
- **String vs Number**: `age = "Santino"` after `age = 20` is silent JS bug. `title: string` forces strings only. `123.toUpperCase()` crashes because only strings have that method.
- **Boolean Types**: `isRemote: boolean` only accepts `true`/`false`. `isRemote: "yes"` causes TS error. Prevents truthy string bugs.
- **Union Types**: `employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'` restricts field to specific values only. Prevents typos like "Fulltime".
- **Optional Properties**: `employmentType?` means field can be `undefined`. Must check before using. No error if missing in object.
- **Union + Optional**: `?: 'A' | 'B'` combines both. Value is either 'A', 'B', or `undefined`.
- **Type Narrowing**: `{job.employmentType && ...}` tells TS "inside here it definitely exists". Prevents undefined crashes.

### **Date Object: Time Is Tricky**
- **Two Types**: `Date.now()` → `number`. `new Date()` → `Date` object. Use `.getTime()` only on Date objects.
- **Creating Dates**: `new Date()` = now. `new Date("2026-05-22")` = specific date. Use ISO strings, not `new Date(2026, 4, 22)` - months are 0-indexed.
- **Display vs Store**: `.toISOString()` → `"2026-05-22T00:00:00.000Z"` for DB/APIs. `.toLocaleDateString()` → `"5/22/2026"` for users.
- **Invalid Dates**: `new Date("bad")` returns `Invalid Date`. Check with `isNaN(date.getTime())`.
- **Math with Dates**: `.getTime()` = ms since 1970. `86400000 ms = 1 day`. `Math.floor()` for whole days. Extract magic numbers: `const MS_PER_DAY = 1000*60*60*24`.

### **Next.js + React: Render Must Be Pure**
- **Hydration Error**: `Date.now()` in JSX crashes because server + client get different values. Fix: Add `'use client'` + `useState` + `useEffect` to run only in browser.
- **Impure Functions**: Calling `Date.now()`, `Math.random()` during render = unstable. React rule: same props → same output.
- **setState Rules**: Never call `setState` in render body. Move to `useEffect(() => {}, [])` to run once after mount.
- **Purity Boundary**: `Date.now()` inside functions is safe. Only impure when called directly in JSX during render.
- **Conditional Rendering**: `{condition && <Element />}` pattern. React renders nothing if `false`. Used for Remote badge.
- **Type Narrowing in JSX**: `{job.employmentType && <span>{job.employmentType}</span>}` safely checks optional values before rendering.

### **Styling: Tailwind CSS**
- **Utility Classes**: `className="font-bold text-3xl"` applies styles directly. Faster than writing CSS files.
- **Color Scale**: `bg-green-100` = very light green background, `text-green-800` = dark green text. `bg-blue-100` used for employmentType badge.
- **Spacing**: `px-2 py-1` = padding x/y. `ml-2` = margin-left. `rounded` = border-radius. `text-sm` = smaller font.

### **Code Architecture: Keep It DRY**
- **Extract Helpers**: Move repeated logic to `utils/` folder. `getDaysAgo()` in `utils/date.ts`.
- **Explicit Return Types**: `: number` on functions prevents accidentally returning strings. TS catches it.

### **Strategy: Domain Modeling**
- **Model First**: Define `interface Job` with all core fields before building UI components. Prevents rewrites.
- **Type-Driven Development**: Let TS errors guide missing data. Red squiggly in fakeJobs = forgot a field.
- **One Concept Per Commit**: Add one field per learning session. Each teaches one TS concept. Prevents overload.

### **Key Takeaway**
TS caught: `string vs number`, `Date vs number`, `missing postedAt`, `boolean vs string`, `invalid union value`, `undefined access`. Without TS, all 6 would crash in production for users.

### **Components & App Structure - 5:24pm Session**

### **Win:**
Built full app architecture in 66min: components/, lib/, utils/, universal Footer. 6 files, 5 commits, 0 runtime errors.

### **Next.js App Router: Folder = Meaning**
- **`app/` = Routes only**: `app/page.tsx` becomes `/`. Put `components/` inside = Next.js creates `/components` URL. Breaks. Keep routes pure.
- **`components/` = UI pieces**: JobCard, Footer live here. Same level as `app/`. Not routable. Import only. Reusable across pages.
- **`lib/` = Shared code**: fakeJobs.ts, supabase.ts later. If 2+ files import it, belongs in lib/. Data + logic, not UI.
- **`utils/` = Pure helpers**: getDaysAgo() lives here. <10 lines, no imports, 1 job. `lib/` = bigger, has imports.
- **`types/` = Contracts**: Job interface defines shape. Import anywhere. Change once, TS updates all usages.

### **React Patterns: Composition Over Monoliths**
- **Props typing**: `type JobCardProps = { job: Job }` → `JobCard({ job }: JobCardProps)`. Destructures props. TS knows job has .title, .company.
- **List rendering**: `{fakeJobs.map(job => <JobCard key={job.id} job={job} />)}`. `key={job.id}` required. React uses it to track items. Missing key = console warning + slow diffs on MTN 2G.
- **Layout.tsx = Wrapper**: Add `<Footer />` in `app/layout.tsx` once. Shows on `/`, `/jobs`, `/about` automatically. DRY. Update WhatsApp number in 1 place.
- **Server vs Client**: `page.tsx` with no 'use client' = Server Component. Can import from `lib/fakeJobs.ts` directly. No useEffect needed. Faster load.

### **Import Paths: @/ = Root Alias**
- **`@/components/JobCard`** = `root/components/JobCard`. Set in `tsconfig.json`. Beats `../../../components` which breaks when you move files.
- **Barrel exports later**: `export * from './JobCard'` in `components/index.ts` → `import { JobCard } from '@/components'`. Not needed yet.

### **Git: Atomic Commits = Time Machine**
- **One concept per commit**: `feat: add JobCard` separate from `chore: move data to lib`. If Footer breaks, revert 1 commit, keep JobCard.
- **Prefixes matter**: `feat:` = user sees it. `chore:` = internal setup. `fix:` = bug. `git log --grep=feat` shows only features for changelog.
- **Commit body**: `-m "feat: add X" -m "Why: Y. Needed for Z"` explains decision for future you at 2am.

### **TypeScript: Required vs Optional Revisited**
- **Required fields crash-safe**: `employmentType: 'Full-time'` means TS forces every job to have it. No `job.employmentType?.toLowerCase()` checks needed in JSX.
- **Optional = debt**: `salary?: number` okay because some NGOs hide pay. `employmentType?:` bad because filters need it. If core to UX, make required.
- **Interface evolution**: V1 `id: number` for fakeJobs. V2 `id: string` when Supabase UUIDs. One refactor. TS finds all places to update.

### **Strategy: Architecture Before Style**
- **Made it work first**: 3 jobs rendering with borders. Ugly but functional. Proved data flows: `lib/fakeJobs` → `page.tsx` → `JobCard` → browser.
- **Style tomorrow**: Tailwind comes after logic works. Easier to add `className="shadow-lg"` to working component than debug CSS + data bugs together.
- **6 files shipped**: Most Day 1 devs have 1 giant `page.tsx`. You separated concerns. When Grace says "make card prettier", you touch JobCard.tsx only.

### **Key Takeaway - Day 1 Total**
TS caught 8 bugs before browser: string/number, Date/number, missing postedAt, boolean/string, invalid union, undefined access, missing employmentType, id type mismatch. 

**Without TS**: 8 production crashes. **With TS**: 0 crashes, 66min power hour, real app structure.

