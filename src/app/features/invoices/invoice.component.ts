import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

type InvoiceItemGroup = FormGroup<{
  text: FormControl<string>;
  price: FormControl<number>;
}>;

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="invoice-header">Invoice</h1>

    <form [formGroup]="form" (ngSubmit)="saveInvoice()">
      <label>
        <span>Subject</span>
        <input type="text" formControlName="subject">
      </label>

      <label>
        <span>Client</span>
        <select formControlName="clientId">
          <option [ngValue]="null">-</option>
          <!-- TODO -->
        </select>
      </label>

      <div formArrayName="items">
        <div
          *ngFor="let item of form.controls.items.controls; let i = index"
          [formGroupName]="i"
          class="invoice-item"
        >
          <input type="text" formControlName="text" placeholder="Item">
          <input type="number" formControlName="price" placeholder="Price">
          <button type="button" (click)="removeItem(i)" class="btn-danger">Remove</button>
        </div>
        <button type="button" (click)="addItem()">New item</button>
      </div>

      <h2 class="invoice-total">Total: €{{ total$ | async }}</h2>
      <button [attr.aria-disabled]="!form.valid || null">Save</button>
      <button type="button" (click)="deleteInvoice()" class="btn-danger">Delete</button>
    </form>
  `
})
export class InvoiceComponent {

  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: ['', Validators.required],
    clientId: ['', Validators.required],
    subject: ['', Validators.required],
    items: this.fb.array([] as InvoiceItemGroup[])
  });

  total$ = of(0); // TODO

  saveInvoice() {
    // TODO
  }

  removeItem(i: number) {
    // TODO
  }

  createItem() {
    return this.fb.group({
      text: ['', Validators.required],
      price: [0, Validators.required]
    })
  }

  addItem() {
    this.form.controls.items.push(this.createItem());
  }

  deleteInvoice() {
    // TODO
  }
}
