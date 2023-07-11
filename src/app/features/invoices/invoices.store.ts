import { inject, Injectable } from '@angular/core';
import { InvoicesService } from '../../api/services/invoices.service';
import { ClientsService } from '../../api/services/clients.service';
import { concatMap, exhaustMap, forkJoin, map, switchMap, tap } from 'rxjs';
import { Client, Invoice } from '../../api/models';
import { ComponentStore } from '@ngrx/component-store';

interface InvoicesState {
  invoices: Invoice[];
  clients: Client[];
}

@Injectable()
export class InvoicesStore extends ComponentStore<InvoicesState>{

  // Deps
  private invoicesService = inject(InvoicesService);
  private clientsService = inject(ClientsService);

  // States
  invoices$ = this.select(state => state.invoices);
  clients$ = this.select(state => state.clients);

  constructor() {
    super({
      invoices: [],
      clients: []
    });
  }

  loadInvoices = this.effect($ => $.pipe(
    exhaustMap(() => forkJoin([
      this.invoicesService.loadInvoices(),
      this.clientsService.loadClients()
    ]).pipe(
      tap(([invoices, clients]) => {
        this.setState({ invoices, clients });
      })
    )),
  ));

  createInvoice = this.effect($ => $.pipe(
    concatMap(() => this.invoicesService.addInvoice({
      subject: '',
      total: 0,
      items: []
    }).pipe(
      tap(invoice => {
        this.setState(state => ({ ...state, invoices: state.invoices.concat(invoice) }))
      })
    )),
  ));

  saveInvoice = this.effect<Invoice>(invoice$ => invoice$.pipe(
    switchMap(invoice => this.invoicesService.editInvoice(invoice).pipe(
      tap(newInvoice => {
        this.setState(state => ({
          ...state,
          invoices: state.invoices.map(i => i.id === newInvoice.id ? newInvoice : i)
        }));
      })
    )),
  ));

  deleteInvoice = this.effect<string>(invoiceId$ => invoiceId$.pipe(
    concatMap(id => this.invoicesService.deleteInvoice(id).pipe(
      map(() => id),
      tap(id => {
        this.setState(state => ({
          ...state,
          invoices: state.invoices.filter(i => i.id !== id)
        }));
      }),
    )),
  ))
}
