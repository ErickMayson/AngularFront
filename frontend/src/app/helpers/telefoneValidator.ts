import { AbstractControl, ValidatorFn } from '@angular/forms';

export function telefoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let phoneNumber = control.value;

    // Remove non-digit characters from the input value
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // Validate the phone number
    const isValid = validatePhoneNumber(digitsOnly);

    return isValid ? null : { 'invalidTelefone': true };
  };
}

function validatePhoneNumber(phoneNumber: string): boolean {
  // Validate the phone number according to your requirements
  // Check if the third digit is '9', indicating a cellphone, and has 9 digits
  // Otherwise, it's a normal telephone with 8 digits
  if (phoneNumber.charAt(2) === '9') {
    return phoneNumber.length === 11; // 9 digits for cellphones
  } else {
    return phoneNumber.length === 10; // 8 digits for normal telephones
  }
}


