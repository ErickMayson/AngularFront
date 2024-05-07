import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClienteComponent } from '../cliente/cliente.component';
import { ClientesService } from '../../services/clientes.service';
import { Cliente, Pedido, Clientes, Pedidos } from '../../../types';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { PedidoComponent } from '../pedido/pedido.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cliente-profile',
  standalone: true,
  imports: [ClienteComponent, CommonModule, PedidoComponent, EditPopupComponent, ButtonModule, RouterLink],
  templateUrl: './cliente-profile.component.html',
  styleUrl: './cliente-profile.component.scss'
})
export class ClienteProfileComponent {

  @Input() cliente!: Cliente;
  clienteId!: number; // Define the type of your ID

  constructor(
      private clientesService: ClientesService,
      private pedidosService: PedidosService,
      private route: ActivatedRoute

    ) { }

    pedidos: Pedido[] = [];


    totalRecords: number = 0;
    rows: number = 12;

    displayEditPopup: boolean = false;
    displayAddPopup: boolean = false;

    toggleEditPopup(pedido: Pedido) {
      this.selectedPedido = pedido;
      this.displayEditPopup = true;
    }

    toggleAddPopup() {
      this.displayAddPopup = true;
    }

    selectedPedido: Pedido = {
      id: 0,
      dataPedido: new Date(),
      descricao: '',
      valor: 0,
      status: 'ACEITO' || 'RECUSADO',
      cliente: 0,
    };


    onConfirmAdd(pedido: Pedido) {
      this.addPedido(pedido);
      this.displayAddPopup = false;
    }

    onPedidoOutput(pedido: Pedido) {
      console.log(pedido, 'Output');
    }

    addPedido(pedido: Pedido) {
    this.pedidosService
      .addPedido(`http://localhost:8090/pedidos`, pedido)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchPedidos(this.clienteId, 0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }


    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.clienteId = params['id']; // Retrieve the ID from the URL and convert it to a number
        console.log(this.clienteId)
        this.fetchCliente(this.clienteId);
        this.fetchPedidos(this.clienteId, 0, this.rows);

      });
    }


    fetchCliente(clienteId: number) {
      this.clientesService.getCliente(`http://localhost:8090/clientes/${clienteId}`, {})
      .subscribe((cliente: Cliente) => {
        console.log(cliente)
        this.cliente = cliente;
      });
    }

    fetchPedidos(clienteId: number, page: number, perPage: number) {
        this.pedidosService
          .getPedidos(`http://localhost:8090/pedidos/cliente/id?id=${clienteId}`, {page, perPage})
          .subscribe({
            next: (data: Pedidos) => {
              console.log(data.pedidos)
              this.pedidos = data.pedidos;
              this.totalRecords = data.total;


            },
            error: (error) => {
              console.log(error);
            },
          });
    }






}
