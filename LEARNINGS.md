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

## 23-05-2026 - Day 2 - 10:00am to 11:30am

### **Win:**
Deployed v0.1 to Vercel. Live URL. Fixed iOS Safari button bug in prod. Posted to FB groups for user testing.

### **Next.js + Deployment: Vercel is Magic**
- **Zero config deploy**: `vercel` command builds + deploys. Auto-detects Next.js. 30sec to live URL.
- **Auto redeploys**: `git push` triggers new deploy. No CI/CD setup needed for V1.
- **Server Components**: `app/page.tsx` with no 'use client' renders on Vercel edge. Fast for MTN 2G.

### **Mobile CSS: iOS Safari Lies**
- **appearance-none**: Kills default iOS button gradients. Without it, `bg-gray-200` looks dark gray.
- **Explicit text colors**: `bg-gray-200` MUST have `text-gray-900`. iOS picks white text otherwise = invisible.
- **active: states**: `active:bg-gray-400` gives tap feedback. Mobile users need visual confirmation.

### **React State: Filters Before DB**
- **useState for UI**: `const [showRemoteOnly, setShowRemoteOnly] = useState(false)` toggles filter. No API needed.
- **Derived state**: `filteredJobs = showRemoteOnly ? fakeJobs.filter(...) : fakeJobs`. Compute from source, don't store 2 arrays.
- **'use client' boundary**: Added to page.tsx because useState only works in Client Components. Server Components can't have state.

### **Strategy: Deploy > Perfect**
- **4 jobs = ship**: Waiting for 20 jobs = never ship. Users test UX now, content later.
- **1 filter = data**: "Show Remote Only" button tells you if users want filters. If 0 clicks, don't build salary filter.
- **Bug in prod = learning**: iOS button bug only visible on real phone. Localhost lies. Deploy early catches real issues.

### **Key Takeaway**
Deployed with 1 bug, fixed in 5min. Users now testing. Without deploy, I'd still be adding features nobody wants. 

## 25-05-2026 - Day 3 - Indeed Redesign + TS Fixes

### **Design: Indeed Layout + Wix Minimal**
- **Search hero**: Input + filter button. Indeed pattern, 0KB icons. Users know how to use it.
- **Job count**: "10 jobs in South Sudan" = inventory transparency. Builds trust vs mystery sites.
- **Type safety**: Exported `Job`, ISO strings for dates. `Date` objects break JSON/SSR. Strings ship.

### **Bugs: TypeScript Teaching Moments**
- **Error 1**: `Job` not exported → Components can't import types. Fix: `export type Job`
- **Error 2**: Missing file → Create `lib/formatRelativeTime.ts`. Utils = separate files.
- **Error 3**: `Date` vs `string` → Data layer uses strings, UI formats. Separation of concerns.
- **Rule**: Fix types immediately. TS errors now = runtime bugs later.

### **Product: Two-Sided Market Live**
- **Seekers**: Apply Now mailto = 0 backend, instant value. Cuts bounce 58% → 40% expected.
- **Employers**: Post Job WhatsApp CTA = 6 NGO viewers can supply jobs same day.
- **Loop**: More jobs → more seekers → more NGOs → more jobs. Started Day 3.