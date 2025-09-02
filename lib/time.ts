// Compute next Aug 13, 00:00 IST as a UTC timestamp
// IST = UTC+5:30, so target UTC time is Aug 12, 18:30 UTC.
export function nextBirthdayISTUtcMs(now = new Date()): number {
    const year = now.getUTCFullYear()
    const base = Date.UTC(year, 7 /* Aug */, 12, 18, 30, 0) // 18:30 UTC = 00:00 IST next day
    const target = now.getTime() > base ? Date.UTC(year + 1, 7, 12, 18, 30, 0) : base
    return target
  }
  
  export function breakdown(ms: number) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000))
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return { days, hours, minutes, seconds }
  }