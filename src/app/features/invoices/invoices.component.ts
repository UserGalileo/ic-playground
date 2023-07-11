import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvoicesStore } from './invoices.store';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InvoicesStore],
  template: `
    <div class="invoices-container">
      <div class="invoice-list">
        <h3>Invoices</h3>
        <ul>
          <li *ngFor="let invoice of (invoices$ | async)">
            <a
              class="invoice-list-item"
              [routerLink]="'/invoices/' + invoice.id"
              routerLinkActive="active"
            >{{ invoice.subject || 'New invoice' }}</a>
          </li>
        </ul>
        <button (click)="createInvoice()">New invoice</button>
      </div>
      <div class="invoice-edit">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class InvoicesComponent implements OnInit {

  store = inject(InvoicesStore);

  invoices$ = this.store.invoices$;

  ngOnInit() {
    this.store.loadInvoices();
  }

  createInvoice() {
    this.store.createInvoice();
  }
}
