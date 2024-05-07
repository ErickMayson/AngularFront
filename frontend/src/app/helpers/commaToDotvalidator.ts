import { AbstractControl, ValidatorFn } from '@angular/forms';

export function commaToPeriodValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valor = control.value;

    // Check if the value starts with zero, return an error
    if (valor && valor.startsWith('0')) {
      return { 'invalidValue': true };
    }

    if (valor && typeof valor === 'string') {
      const sanitizedValor = valor.replace(/,/g, '.'); // Replace all commas with periods
      if (sanitizedValor !== valor) {
        // If the value was changed, update the control value
        control.setValue(sanitizedValor);
      }
    }
    return null; // Return null to indicate validation passed
  };
}
