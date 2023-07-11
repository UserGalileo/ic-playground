import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client, Invoice } from '../models';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  http = inject(HttpClient);

  loadInvoices() {
    return this.http.get<Invoice[]>(`${env.apiUrl}/invoices`);
  }

  deleteInvoice(id: string) {
    return this.http.delete(`${env.apiUrl}/invoices/${id}`);
  }

  addInvoice(invoice: Omit<Invoice, 'id'>) {
    return this.http.post<Invoice>(`${env.apiUrl}/invoices`, invoice);
  }

  editInvoice(invoice: Invoice) {
    return this.http.put<Invoice>(`${env.apiUrl}/invoices/${invoice.id}`, invoice);
  }
}
