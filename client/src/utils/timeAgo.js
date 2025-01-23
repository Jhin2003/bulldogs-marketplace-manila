const timeAgo = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const seconds = Math.floor((now - createdDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  const format = (value, unit) => `${value} ${unit}${value === 1 ? '' : 's'} ago`;

  if (seconds < 60) return format(seconds, 'second');
  if (minutes < 60) return format(minutes, 'minute');
  if (hours < 24) return format(hours, 'hour');
  if (days < 30) return format(days, 'day');
  if (months < 12) return format(months, 'month');
  return format(years, 'year');
};

export default timeAgo;