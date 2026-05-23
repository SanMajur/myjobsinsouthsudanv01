export function getDaysAgo(date: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  const diff = Date.now() - date.getTime()
  return Math.floor(diff / msPerDay)
}