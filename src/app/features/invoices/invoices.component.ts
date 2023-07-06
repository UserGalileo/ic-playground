import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Invoice } from '../../api/models';
import { InvoicesService } from '../../api/services/invoices.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="invoices-container">
      <div class="invoice-list">
        <h3>Invoices</h3>
        <ul>
          <li *ngFor="let invoice of invoices">
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
export class InvoicesComponent {

  invoicesService = inject(InvoicesService);

  invoices: Invoice[] = [];

  ngOnInit() {
    this.invoicesService.loadInvoices().subscribe(invoices => {
      this.invoices = invoices;
    })
  }

  createInvoice() {
    this.invoicesService.addInvoice({
      subject: '',
      total: 0,
      items: []
    }).subscribe(invoice => {
      this.invoices = [...this.invoices, invoice];
    })
  }

}
