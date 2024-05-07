import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value) {
      // If no value is provided, return null (valid)
      return null;
    }

    // Split the date value into its components
    const parts = value.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    // Check if year is between 1900 and 2100
    if (year < 1900 || year > 2100) {
      return { 'invalidYear': { value } };
    }

    // Check if month is between 1 and 12
    if (month < 1 || month > 12) {
      return { 'invalidMonth': { value } };
    }

    // Check if day is between 1 and 31 (basic check, can be enhanced for different months)
    if (day < 1 || day > 31) {
      return { 'invalidDay': { value } };
    }

    // Check if the day is valid for February (leap year check)
    if (month === 2 && day > 29) {
      // Check for leap year
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      if (!isLeapYear || day > 29) {
        return { 'invalidDay': { value } };
      }
    }

    return null; // If the date is valid, return null (valid)
  };
}

