import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { delay, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export function forbidden(forbiddenString: string): ValidatorFn {
  return (control) => {
    return control.value === 'michele' ? { forbidden: `${forbiddenString} is not allowed here.` } : null;
  }
}

export function noMarioRossi(control: AbstractControl): ValidationErrors | null {
  const isMario = control.get('firstName')?.value === 'mario';
  const isRossi = control.get('lastName')?.value === 'rossi';
  return isMario && isRossi ? { noMarioRossi: true } : null;
}

@Injectable({ providedIn: 'root' })
export class ExistingValidator {

  validate(): AsyncValidatorFn {
    return (control) => {
      const errors = control.value === 'michele' ? {existing: true} : null;
      return of(errors).pipe(
        delay(1000)
      );
    }
  }
}
