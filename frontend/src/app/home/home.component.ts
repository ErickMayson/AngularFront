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

    totalRecords: number = 0;
    rows: number = 12;


    fetchClientes(page: number, perPage: number) {
      this.clientesService
        .getClientes('http://localhost:8090/clientes', { page, perPage })
        .subscribe({
          next: (data: Clientes) => {
            this.clientes = data.clientes;
            this.totalRecords = data.total;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }


    addCliente(cliente: Cliente) {
      console.log(cliente, 'Add');
    }



    ngOnInit() {
    this.fetchClientes(0, this.rows);
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
