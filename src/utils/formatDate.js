export function formatDate(isoDate) {
  if (!isoDate) return "--/--/----";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}
