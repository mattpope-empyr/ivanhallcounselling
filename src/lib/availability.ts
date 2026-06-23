/**
 * Availability + booking model.
 *
 * This is a self-contained, front-end-friendly source of truth so the site works
 * with no backend. It is deliberately simple to update by hand, and structured so it
 * can be swapped for Supabase, Google Calendar or Calendly later without touching the UI.
 *
 * To connect a real backend later:
 *   - Replace `getAvailableSlots()` with a fetch to your provider.
 *   - Replace the in-memory `bookedSlots` set in /api/booking with a DB write.
 */

/** Weekly working pattern. Keyed by day-of-week (0 = Sunday ... 6 = Saturday). */
export const workingHours: Record<number, string[]> = {
  1: ["09:30", "11:00", "13:00", "16:30", "18:00"], // Monday
  2: ["09:30", "11:00", "13:00", "16:30", "18:00"], // Tuesday
  3: ["09:30", "11:00", "13:00", "16:30"], // Wednesday
  4: ["11:00", "13:00", "16:30", "18:00"], // Thursday
  5: ["09:30", "11:00", "13:00"], // Friday
};

/**
 * Slots that are already taken or blocked off.
 * Format: "YYYY-MM-DD HH:mm". Edit this list to keep the diary accurate,
 * or let the booking API append to it.
 */
export const blockedSlots: string[] = [
  // Examples — remove or replace with real bookings.
];

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export type DaySlots = {
  /** "YYYY-MM-DD" */
  date: string;
  /** JS Date at local midnight */
  dateObj: Date;
  dayName: string;
  dayNumber: number;
  month: string;
  /** Available times like "09:30", with booked ones removed */
  times: string[];
  isWeekend: boolean;
};

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatTime(time: string): string {
  const [hStr, m] = time.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === "00" ? `${h12}${period}` : `${h12}:${m}${period}`;
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${DAY_NAMES[date.getDay()]} ${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

/**
 * Build available slots for the next `days` days, starting `leadDays` from today,
 * with booked/blocked times removed.
 */
export function getAvailableSlots(opts?: {
  days?: number;
  leadDays?: number;
  blocked?: string[];
  from?: Date;
}): DaySlots[] {
  const days = opts?.days ?? 28;
  const leadDays = opts?.leadDays ?? 1;
  const blocked = new Set([...(blockedSlots ?? []), ...(opts?.blocked ?? [])]);

  const start = opts?.from ? new Date(opts.from) : new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + leadDays);

  const result: DaySlots[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dow = d.getDay();
    const baseTimes = workingHours[dow] ?? [];
    if (baseTimes.length === 0) continue;

    const iso = toISODate(d);
    const times = baseTimes.filter((t) => !blocked.has(`${iso} ${t}`));
    if (times.length === 0) continue;

    result.push({
      date: iso,
      dateObj: d,
      dayName: DAY_NAMES[dow],
      dayNumber: d.getDate(),
      month: MONTH_NAMES[d.getMonth()],
      times,
      isWeekend: dow === 0 || dow === 6,
    });
  }
  return result;
}

/** Plain, serializable shape passed from server pages to the client booking widget. */
export type BookingDay = {
  date: string;
  weekday: string;
  weekdayShort: string;
  day: number;
  month: string;
  times: string[];
};

export function getBookingDays(opts?: Parameters<typeof getAvailableSlots>[0]): BookingDay[] {
  return getAvailableSlots(opts).map((d) => ({
    date: d.date,
    weekday: d.dayName,
    weekdayShort: DAY_NAMES_SHORT[d.dateObj.getDay()],
    day: d.dayNumber,
    month: d.month,
    times: d.times,
  }));
}

export function isSlotAvailable(date: string, time: string, blocked?: string[]): boolean {
  const all = getAvailableSlots({ days: 120, blocked });
  const day = all.find((d) => d.date === date);
  return !!day && day.times.includes(time);
}
