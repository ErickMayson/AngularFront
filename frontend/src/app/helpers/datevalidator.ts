import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
        const dateString = control.value;
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        if (!datePattern.test(dateString)) {
            return { 'invalidDateFormat': true };
        }

        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day); // month - 1 because months are zero-based in JavaScript

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return { 'invalidDate': true };
        }

        // Check if the year, month, and day values match the input
        if (date.getFullYear() !== +year || (date.getMonth() + 1) !== +month || date.getDate() !== +day) {
            return { 'invalidDate': true };
        }

        return null; // Date is valid
    };
}
