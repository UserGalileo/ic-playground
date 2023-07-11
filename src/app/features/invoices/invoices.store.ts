import { inject, Injectable } from '@angular/core';
import { InvoicesService } from '../../api/services/invoices.service';
import { ClientsService } from '../../api/services/clients.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Client, Invoice } from '../../api/models';

@Injectable()
export class InvoicesStore {

  // Deps
  private invoicesService = inject(InvoicesService);
  private clientsService = inject(ClientsService);

  // States
  invoices$ = new BehaviorSubject<Invoice[]>([]);
  clients$ = new BehaviorSubject<Client[]>([]);

  loadInvoices() {
    forkJoin([
      this.invoicesService.loadInvoices(),
      this.clientsService.loadClients()
    ]).subscribe(([invoices, clients]) => {
      this.invoices$.next(invoices);
      this.clients$.next(clients);
    })
  }

  createInvoice() {
    this.invoicesService.addInvoice({
      subject: '',
      total: 0,
      items: []
    }).subscribe(invoice => {
      this.invoices$.next([ ...this.invoices$.getValue(), invoice ]);
    })
  }

  saveInvoice(invoice: Invoice) {
    this.invoicesService.editInvoice(invoice).subscribe(newInvoice => {
      this.invoices$.next(
        this.invoices$.getValue().map(i => i.id === invoice.id ? newInvoice : i)
      )
    })
  }

  deleteInvoice(id: string) {
    this.invoicesService.deleteInvoice(id).subscribe(() => {
      this.invoices$.next(
        this.invoices$.getValue().filter(i => i.id !== id)
      )
    })
  }
}
