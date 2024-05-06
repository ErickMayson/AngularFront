import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Clientes } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private apiService: ApiService) {}

  getClientes = (url: string, params: any): Observable<Clientes> => {
      return this.apiService.get(url, {
        params,
        responseType: "json",
      })

}

}
