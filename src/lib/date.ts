/**
 * データベースはUTC時間保存されているのが基本
 * NEXT側でUTCかJSTか判断するのは不可能
 * 
 */



/**
 * 
 * @param date 
 * @returns 
 */
export function utcFormatDateWithDay(
  date?: Date | string | null
): string | null {
  if (!date) return null;

  const d = typeof date === 'string' ? new Date(date) : date;

  return d.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
}
/**
 * 
 * @param date 
 * @returns 
 */
export function utcFormatDateTimeWithDay(
  date?: Date | string | null
): string | null {
  if (!date) return null;

  const d = typeof date === 'string' ? new Date(date) : date;

  return d.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

