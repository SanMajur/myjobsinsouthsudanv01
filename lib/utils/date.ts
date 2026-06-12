export function getDaysAgo(date: Date): number { // function is type of number because it returns the number of days ago
  const msPerDay = 1000 * 60 * 60 * 24 // number of milliseconds in a day 86400000 milliseconds in a day
  const diff = Date.now() - date.getTime() 
  return Math.max(0, Math.floor(diff / msPerDay)) // returns the number of days ago, if the date is in the future it returns 0
}

export function formatRelativeTime(date: Date): string {
  const daysAgo = getDaysAgo(date);
  
  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  return `${daysAgo} days ago`;
}