import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Pedido } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { dateValidator } from '../../helpers/datevalidator';
import { acceptanceValidator } from '../../helpers/acceptancevalidator';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-pedido-popup',
  standalone: true,
  imports: [

    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,


  ],
  templateUrl: './pedido-popup.component.html',
  styleUrl: './pedido-popup.component.scss'
})
export class PedidoPopupComponent {

  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() clienteId: number = 0; // Input property to receive the client ID


  @Input() header!: string;

  @Input() pedido: Pedido = {
    dataPedido: '',
    descricao: '',
    valor: 0,
    status: 'ACEITO' || 'RECUSADO',
    cliente_id: 0,
  };

  @Output() confirm = new EventEmitter<Pedido>();

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  pedidoForm = this.formBuilder.group({
    dataPedido: ['', [Validators.required, dateValidator()]],
    descricao: [''],
    valor: [0],
    status: ['', [Validators.required, acceptanceValidator()]],
    cliente: [this.clienteId]
  });

  ngOnChanges() {
    this.pedidoForm.patchValue(this.pedido);
    // Update the form control value when clientId changes
    this.pedidoForm.get('cliente')?.setValue(this.clienteId);
  }

  onConfirm() {
    const { dataPedido, cliente, descricao, valor, status } = this.pedidoForm.value;

    const pedido: Pedido = {
    dataPedido: dataPedido || '',
    descricao: descricao || '',
    valor: valor || 0,
    status: 'ACEITO' || 'RECUSADO', // Assuming status can't be empty
    cliente_id: this.clienteId  // Include clienteId from component property
    };

    console.log(pedido)


   // this.confirm.emit({
   //   dataPedido: dataPedido || '',
   //   cliente: this.clienteId || 0,
   //   descricao: descricao || '',
   //   valor: valor || 0,
   //   status: 'ACEITO' || 'RECUSADO',
   // });


    this.confirm.emit(pedido);


    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
