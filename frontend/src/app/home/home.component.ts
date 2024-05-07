import { Component } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { Cliente, Clientes } from '../../types';
import { response } from 'express';
import { ClienteComponent } from '../components/cliente/cliente.component';
import { CommonModule } from '@angular/common';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ClienteComponent, CommonModule, EditPopupComponent, ButtonModule],
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

    displayEditPopup: boolean = false;
    displayAddPopup: boolean = false;

  toggleEditPopup(cliente: Cliente) {
    this.selectedCliente = cliente;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedCliente: Cliente = {
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  };


  onConfirmAdd(cliente: Cliente) {
    this.addCliente(cliente);
    this.displayAddPopup = false;
  }

  onClienteOutput(cliente: Cliente) {
    console.log(cliente, 'Output');
  }


    fetchClientes(page: number, perPage: number) {
      this.clientesService
        .getClientes('http://localhost:8090/clientes', { page, perPage })
        .subscribe({
          next: (data: Clientes) => {
            console.log(data)
            this.clientes = data.clientes;
            this.totalRecords = data.total;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }


    addCliente(cliente: Cliente) {
    this.clientesService
      .addCliente(`http://localhost:8090/clientes`, cliente)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchClientes(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
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
