import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { forbidden } from '../validators';

@Directive({
  selector: '[forbidden]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenDirective,
      multi: true
    }
  ]
})
export class ForbiddenDirective implements Validator {

  @Input('forbidden') forbiddenString = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return forbidden(this.forbiddenString)(control);
  }
}
