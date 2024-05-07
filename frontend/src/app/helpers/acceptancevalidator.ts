import { AbstractControl, ValidatorFn } from '@angular/forms';

export function acceptanceValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value) {
      return null; // If no value is provided, return null (valid)
    }

    const acceptedValues = ['ACEITO', 'RECUSADO'];
    const uppercaseValue = control.value.toUpperCase();

    // Check if the uppercase input value is in the accepted values array
    if (!acceptedValues.includes(uppercaseValue)) {
      return { 'invalidAcceptanceStatus': {value: control.value} };
    }

    return null; // If the input is valid, return null (valid)
  };
}
