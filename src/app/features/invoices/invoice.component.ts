import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  combineLatest,
  concatWith,
  defer,
  distinctUntilChanged,
  map,
  of
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoicesStore } from './invoices.store';
import { InvoiceItem } from '../../api/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type InvoiceItemGroup = FormGroup<{
  text: FormControl<string>;
  price: FormControl<number>;
}>;

function valueChanges<T, U extends T>(control: AbstractControl<T, U>) {
  return defer(() => of(control.value)).pipe(
    concatWith(control.valueChanges)
  )
}

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
          <option *ngFor="let client of (clients$ | async)" [value]="client.id">{{ client.name }}</option>
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
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(InvoicesStore);

  form = this.fb.group({
    id: ['', Validators.required],
    clientId: ['', Validators.required],
    subject: ['', Validators.required],
    items: this.fb.array([] as InvoiceItemGroup[])
  });

  clients$ = this.store.clients$;

  invoiceId$ = this.route.paramMap.pipe(
    map(params => params.get('id'))
  );

  currentInvoice$ = combineLatest([
    this.store.invoices$,
    this.invoiceId$
  ]).pipe(
    map(([invoices, id]) => invoices.find(invoice => invoice.id === id)),
    distinctUntilChanged((a, b) => a?.id === b?.id)
  );

  total$ = valueChanges(this.form).pipe(
    map(() => this.calculateTotal(this.form.getRawValue().items)),
  );

  constructor() {
    this.currentInvoice$.pipe(
      takeUntilDestroyed()
    ).subscribe(invoice => {
      if (invoice) {
        this.form.controls.items.clear({
          emitEvent: false
        });

        invoice.items.forEach(() => {
          this.addItem(false);
        });

        this.form.reset(invoice);
      }
    });
  }

  saveInvoice() {
    if (this.form.valid) {
      this.store.saveInvoice({
        ...this.form.getRawValue(),
        total: this.calculateTotal(this.form.getRawValue().items),
      });
      this.form.markAsPristine();
    }
  }

  removeItem(i: number) {
    this.form.controls.items.removeAt(i);
  }

  createItem() {
    return this.fb.group({
      text: ['', Validators.required],
      price: [0, Validators.required]
    });
  }

  addItem(emitEvent = true) {
    this.form.controls.items.push(this.createItem(), { emitEvent });
  }

  deleteInvoice() {
    this.store.deleteInvoice(this.form.getRawValue().id);
    this.router.navigateByUrl('/invoices');
  }

  calculateTotal(items: InvoiceItem[]) {
    return items.reduce((total, item) => total + item.price, 0);
  }

  canDeactivate() {
    if (this.form.dirty) {
      return confirm('You have unsaved changes. Leave anyway?');
    }
    return true;
  }
}
