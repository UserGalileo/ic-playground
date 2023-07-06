import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  http = inject(HttpClient);

  loadClients() {
    return this.http.get<Client[]>(`${env.apiUrl}/clients`);
  }

  deleteClient(id: string) {
    return this.http.delete(`${env.apiUrl}/clients/${id}`);
  }

  addClient(client: Omit<Client, 'id'>) {
    return this.http.post<Client>(`${env.apiUrl}/clients`, client);
  }
}
