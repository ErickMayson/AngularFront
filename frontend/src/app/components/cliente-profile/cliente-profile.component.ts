import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClienteComponent } from '../cliente/cliente.component';
import { ClientesService } from '../../services/clientes.service';
import { Cliente, Pedido, Clientes, Pedidos } from '../../../types';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { PedidoComponent } from '../pedido/pedido.component';
import { ButtonModule } from 'primeng/button';
import { PedidoPopupComponent } from '../pedido-popup/pedido-popup.component';
import { DateUtils } from '../../helpers/dateUtils';

@Component({
  selector: 'app-cliente-profile',
  standalone: true,
  imports: [ClienteComponent, CommonModule, PedidoComponent, PedidoPopupComponent, ButtonModule, RouterLink],
  providers: [DateUtils],
  templateUrl: './cliente-profile.component.html',
  styleUrl: './cliente-profile.component.scss'
})
export class ClienteProfileComponent {

  @Input() cliente!: Cliente;

  clienteId!: number; // Define the type of your ID

  constructor(
      private clientesService: ClientesService,
      private pedidosService: PedidosService,
      private route: ActivatedRoute,
      private dateUtils: DateUtils
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
      dataPedido: '',
      descricao: '',
      valor: 0,
      status: 'ACEITO' || 'RECUSADO',
      cliente: 0,
    };

    onConfirmEdit(pedido: Pedido) {
    if (!this.selectedPedido.id) {
      return;
    }

    this.editPedido(this.clienteId, pedido, this.selectedPedido.id);
    this.displayEditPopup = false;
  }


    onConfirmAdd(pedido: Pedido) {
      this.addPedido(pedido);
      this.displayAddPopup = false;
    }

    onPedidoOutput(pedido: Pedido) {
      console.log(pedido, 'Output');
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.clienteId = params['id']; // Retrieve the ID from the URL and convert it to a number
        console.log(this.clienteId)
        this.fetchCliente(this.clienteId);
        this.fetchPedidos(this.clienteId, 0, this.rows);

      });
    }


    addPedido(pedido: Pedido) {
    this.pedidosService
      .addPedido(`http://localhost:8090/pedidos/addPedido`, pedido)
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

    editPedido(clienteId: number, pedido: Pedido, id: number) {
    this.pedidosService
      .editPedido(`http://localhost:8090/pedidos/editPedido/${id}`, pedido)
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


    fetchCliente(clienteId: number) {
      this.clientesService.getCliente(`http://localhost:8090/clientes/${clienteId}`, {})
      .subscribe((cliente: Cliente) => {
        // console.log(cliente)
        this.cliente = cliente;
      });
    }

    fetchPedidos(clienteId: number, page: number, perPage: number) {
    this.pedidosService
      .getPedidos(`http://localhost:8090/pedidos/cliente/id?id=${clienteId}`, { page, perPage })
      .subscribe({
        next: (data: Pedidos) => {
          console.log("Fetch using " + this.clienteId);
          // Format the dataPedido property for each Pedido object
          this.pedidos = data.pedidos.map(pedido => ({
            ...pedido,
            dataPedido: this.dateUtils.formatDate(pedido.dataPedido) // Format the date
          }));
          console.log(this.pedidos);
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }


}
