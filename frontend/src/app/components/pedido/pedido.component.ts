import { Component,
  EventEmitter,
  Input,
  Output,
 } from '@angular/core';
import { Cliente, Pedido } from '../../../types';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.scss'
})
export class PedidoComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @Input() pedido!: Pedido;
  @Output() edit: EventEmitter<Pedido> = new EventEmitter<Pedido>();

  editPedido() {
    this.edit.emit(this.pedido);
  }

  ngOnInit() {}

}
