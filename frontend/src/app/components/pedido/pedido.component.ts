import { Component, Input } from '@angular/core';
import { Cliente, Pedido } from '../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.scss'
})
export class PedidoComponent {
  @Input() pedido!: Pedido;
 // @Input() cliente!: Cliente;

  ngOnInit(): void {
    console.log("Pedido item",this.pedido);
    //console.log("Pedido item",this.cliente);
  }
}
