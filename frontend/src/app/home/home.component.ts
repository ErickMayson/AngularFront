import { Component } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { Cliente, Clientes } from '../../types';
import { response } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor(
      private clientesService: ClientesService
    ) { }

    // ngOnInit() {
    //   this.clientesService.getClientes('http://localhost:8090/clientes', {})
    //   .subscribe((clientes : Clientes) => {
    //     console.log(clientes.clientes);
    //   });
    // }

     ngOnInit() {
      this.clientesService.getClientes('http://localhost:8090/clientes', {page: 0, perPage: 5})
      .subscribe((clientes: Cliente) => {
        console.log(clientes)
      });
    }


}
