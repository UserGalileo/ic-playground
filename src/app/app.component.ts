import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ExistingValidator, noMarioRossi } from './validators';

@Component({
  selector: 'app-root',
  template: `
    <!--    <a routerLink="/">counter</a> |-->
    <!--    <a routerLink="/todos">todos</a>-->
    <!--    <hr>-->
    <!--    <router-outlet></router-outlet>-->

    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="firstName">
      <input type="text" formControlName="lastName">

      <div formGroupName="address">
        <input type="text" formControlName="city">
        <input type="text" formControlName="street">
      </div>

      <div formArrayName="phones">
        <div *ngFor="let phone of form.controls.phones.controls; let i = index">
          <input type="text" [formControlName]="i">
        </div>
      </div>

      <button type="reset">reset</button>

    </form>

    <button (click)="addPhone()">Add phone</button>

    <hr>

    {{ form.value | json }}

  `,
})
export class AppComponent {

  fb = inject(NonNullableFormBuilder);
  existingValidator = inject(ExistingValidator);

  form = this.fb.group({
    firstName: ['', [], [this.existingValidator.validate()]],
    lastName: '',
    address: this.fb.group({
      city: '',
      street: ''
    }),
    phones: this.fb.array([])
  }, {
    // Cross-field validation
    validators: [noMarioRossi],
  });

  addPhone() {
    this.form.controls.phones.push(
      this.fb.control('')
    )
  }

  onSubmit() {
    console.log(this.form.getRawValue());
  }

}
