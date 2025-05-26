import dayjs from 'dayjs';
import nl from 'dayjs/locale/nl';

/**
 * Formats a date string to a human-readable format (DD Month YYYY)
 * @param dateString - The date string to format
 * @returns Formatted date string or null if input is invalid
 */
export const formatDate = (dateString: string | null | undefined): string | null => {
  if (!dateString) return null;

  return dayjs(dateString).locale(nl).format('D MMMM YYYY');
};
