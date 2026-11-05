const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const issues = [
  ['Dec 2025.pdf', 2025, 11, '/assets/darpans/covers/dec-2025.png'],
  ['Jan 2026.pdf', 2026, 0, '/assets/darpans/covers/jan-2026.png'],
  ['Feb 2026.pdf', 2026, 1],
  ['Mar 2026.pdf', 2026, 2],
  ['Apr 2026.pdf', 2026, 3],
  ['July 2026.pdf', 2026, 6],
  ['Aug 2026.pdf', 2026, 7],
  ['Sept 2026.pdf', 2026, 8],
  ['May 2026.pdf', 2026, 4],
];

export const darpanIssues = issues.map(
  ([filename, year, month, coverImage]) => ({
    filename,
    title: `${months[month]} ${year}`,
    year,
    month,
    publishedAt: `${year}-${String(month + 1).padStart(2, '0')}`,
    url: `/assets/darpans/${encodeURIComponent(filename)}`,
    coverImage,
  })
);
