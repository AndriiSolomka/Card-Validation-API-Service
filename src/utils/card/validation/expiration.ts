export function isCardExpired(monthStr: string, yearStr: string): boolean {
  const month = Number(monthStr);
  const year = Number(yearStr);
  if (isNaN(month) || isNaN(year)) return false;
  const now = new Date();
  const expDate = new Date(year, month - 1, 1);
  const endOfMonth = new Date(expDate.getFullYear(), expDate.getMonth() + 1, 0);
  return endOfMonth < now;
}
