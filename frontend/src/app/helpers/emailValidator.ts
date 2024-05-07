import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;

    // Check if the email contains '@' and ends with '.com'
    const isValid = email && email.includes('@') && email.endsWith('.com');

    return isValid ? null : { 'invalidEmail': true };
  };
}
