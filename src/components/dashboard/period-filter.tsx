"use client";

export function periodDates(period: string) {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  if (period === 'yesterday') { start.setDate(start.getDate() - 1); end.setDate(end.getDate() - 1); }
  if (period === 'this_week' || period === 'last_week') {
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7) - (period === 'last_week' ? 7 : 0));
    if (period === 'last_week') { end.setTime(start.getTime()); end.setDate(end.getDate() + 6); }
  }
  if (period === 'this_month') start.setDate(1);
  if (period === 'last_month') { start.setMonth(start.getMonth() - 1, 1); end.setDate(0); }
  const format = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return { from: format(start), to: format(end) };
}
export function PeriodFilter({ value, from, to, onChange }: {
  value: string; from: string; to: string;
  onChange: (period: string, dates: { from: string; to: string }) => void;
}) {
  return <><label><span>Period</span><select value={value} onChange={e => onChange(e.target.value, e.target.value === 'custom' ? { from: '', to: '' } : periodDates(e.target.value))}>
    <option value="today">Today</option><option value="yesterday">Yesterday</option><option value="this_week">This week</option><option value="last_week">Last week</option><option value="this_month">This month</option><option value="last_month">Last month</option><option value="custom">Custom</option>
  </select></label>{value === 'custom' && <><label><span>From</span><input aria-label="From date" type="date" value={from} max={to || undefined} onChange={e => onChange('custom', { from: e.target.value, to })} /></label><label><span>To</span><input aria-label="To date" type="date" value={to} min={from || undefined} onChange={e => onChange('custom', { from, to: e.target.value })} /></label></> }</>;
}
