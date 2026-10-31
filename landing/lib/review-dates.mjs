const relative = new Intl.RelativeTimeFormat('es', { numeric: 'always' });
const singular = { minute: 'un minuto', hour: 'una hora', day: 'un día', week: 'una semana', month: 'un mes', year: 'un año' };
const age = (count, unit) => count === 1 ? `hace ${singular[unit]}` : relative.format(-count, unit);

function completeMonths(timestamp, now) {
  const published = new Date(timestamp);
  const current = new Date(now);
  let months = (current.getUTCFullYear() - published.getUTCFullYear()) * 12 + current.getUTCMonth() - published.getUTCMonth();
  const anniversary = new Date(timestamp);
  anniversary.setUTCDate(1);
  anniversary.setUTCMonth(published.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(anniversary.getUTCFullYear(), anniversary.getUTCMonth() + 1, 0)).getUTCDate();
  anniversary.setUTCDate(Math.min(published.getUTCDate(), lastDay));
  if (anniversary.getTime() > now) months--;
  return months;
}

/** Format only a supplied publication date; never infer one from missing data. */
export function formatRelativeReviewDate(value, now = Date.now()) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T.+)?$/.test(value)) return null;
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp) || !Number.isFinite(now) || timestamp > now) return null;
  if (value.length === 10 && new Date(timestamp).toISOString().slice(0, 10) !== value) return null;
  const seconds = Math.floor((now - timestamp) / 1000);
  if (seconds < 60) return 'hace unos instantes';
  const months = completeMonths(timestamp, now);
  if (months >= 12) return age(Math.floor(months / 12), 'year');
  if (months >= 1) return age(months, 'month');
  const units = [[604800, 'week'], [86400, 'day'], [3600, 'hour'], [60, 'minute']];
  for (const [duration, unit] of units) {
    if (seconds >= duration) {
      const count = Math.floor(seconds / duration);
      return age(count, unit);
    }
  }
  return null;
}
