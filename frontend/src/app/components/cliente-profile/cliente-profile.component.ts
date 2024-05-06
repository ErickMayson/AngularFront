import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClienteComponent } from '../cliente/cliente.component';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../../types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-profile',
  standalone: true,
  imports: [ClienteComponent, CommonModule],
  templateUrl: './cliente-profile.component.html',
  styleUrl: './cliente-profile.component.scss'
})
export class ClienteProfileComponent {

  @Input() cliente!: Cliente;
  clienteId!: number; // Define the type of your ID

  constructor(
      private clientesService: ClientesService,
      private route: ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clienteId = +params['id']; // Retrieve the ID from the URL and convert it to a number
      this.fetchCliente(this.clienteId);
    });
  }


   fetchCliente(clienteId: number) {
     this.clientesService.getCliente(`http://localhost:8090/clientes/${clienteId}`, {})
     .subscribe((cliente: Cliente) => {
       console.log(cliente)
       this.cliente = cliente;
     });
   }




}
