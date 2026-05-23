### Template for daily entry
## 22-05-2026 - Day 0
- **Learned:** How to install a NEXT.js project with TypeScript + Tailwind using `npx create-next-app/latest
- **Shipped:** Cleaned biolerplate in app/page.tsx and got localhost:3000 running
- **Next:** Create types/jobs.ts and write my first Job interface
## 23-05-2026 - Day 1

### **Win:** 
Shipped `postedAt: Date` with hydration fix. TS prevented 4 runtime crashes before code hit browser.

### **TypeScript: Types Prevent Runtime Bugs**
- **Interface = Blueprint**: `interface Job` in `types/job.ts` defines required shape. Forces every job to have `id`, `title`, `company`, `location`, `postedAt`.
- **Arrays of Objects**: `Job[]` enables `.map()`, `.filter()`, `.length`. One `Job` = object, `Job[]` = list.
- **Import/Export**: `export interface Job` → `import { Job } from '@/types/job'`. Gives autocomplete, catches typos like `job.tilte`.
- **String vs Number**: `age = "Santino"` after `age = 20` is silent JS bug. `title: string` forces strings only. `123.toUpperCase()` crashes because only strings have that method.

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

### **Code Architecture: Keep It DRY**
- **Extract Helpers**: Move repeated logic to `utils/` folder. `getDaysAgo()` in `utils/date.ts`.
- **Explicit Return Types**: `: number` on functions prevents accidentally returning strings. TS catches it.

### **Key Takeaway**
TS caught: `string vs number`, `Date vs number`, `missing postedAt`. Without TS, all 3 would crash in production for users.