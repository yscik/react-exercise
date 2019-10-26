
export function adjustDateForTimezone(date, timezoneOffset)
{
  date.setUTCHours(date.getUTCHours() + timezoneOffset || 0);
  return date;
}

export function formatTime(date, {separator}) {
  const [hour, min] = [date.getUTCHours(), date.getUTCMinutes()]
      .map(s => ("" + s).padStart(2, '0'));
  return `${hour}${separator}${min}`;
}