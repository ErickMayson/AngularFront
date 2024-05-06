import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Cliente, Clientes, PaginationParams } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private apiService: ApiService) {}

  getClientes = (url: string, params: PaginationParams): Observable<Clientes> => {
      return this.apiService.get(url, {
        params,
        responseType: "json",
      })

  }

  getCliente = (url: string, params: any): Observable<Cliente> => {
      return this.apiService.get(url, {
        params,
        responseType: "json",
      })

  }

  // Adding a product via the API
  addCliente = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  // Se der tempo, eu implemento
  editCliente = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  // Não implementado
  deleteCliente = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };


}
