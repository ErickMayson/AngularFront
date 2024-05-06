import { Component } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { Cliente, Clientes } from '../../types';
import { response } from 'express';
import { ClienteComponent } from '../components/cliente/cliente.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ClienteComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor(
      private clientesService: ClientesService
    ) { }

    clientes: Cliente[] = [];

     ngOnInit() {
      this.clientesService.getClientes('http://localhost:8090/clientes', {page: 0, perPage: 5})
      .subscribe((clientes: Clientes) => {
        console.log(clientes.clientes)
        this.clientes = clientes.clientes;

      });
    }



    // Just did this to test if the types work correctly.

   // ngOnInit() {
   //   this.clientesService.getCliente('http://localhost:8090/clientes/1', {page: 0, perPage: 5})
   //   .subscribe((cliente: Cliente) => {
   //     console.log(cliente.nome)
   //     // this.cliente = cliente.nome;
//
   //   });
   // }



}
