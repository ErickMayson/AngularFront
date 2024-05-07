export class DateUtils {
  formatDate(dateString: string): string {
    if (!dateString) return '';

    const parts = dateString.split('T')[0].split('-'); // Extract date part and split by '-'
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${year}-${month}-${day}`;
  }
}
