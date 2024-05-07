import { Injectable } from '@angular/core';
import { PaginationParams, Pedido, Pedidos } from '../../types';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private apiService: ApiService) {}

  getPedidos = (url: string, params: PaginationParams): Observable<Pedidos> => {
      return this.apiService.get(url, {
        params,
        responseType: "json",
      })

  }

  getPedido = (url: string, params: any): Observable<Pedido> => {
      return this.apiService.get(url, {
        params,
        responseType: "json",
      })

  }

  // Adding a product via the API
  addPedido = (url: string, body: Pedido): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  // Se der tempo, eu implemento
  editPedido = (url: string, body: Pedido): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  // Não implementado
  deletePedido = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };

}
