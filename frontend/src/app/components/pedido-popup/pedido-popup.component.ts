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
    NgxMaskDirective


  ],
  templateUrl: './pedido-popup.component.html',
  styleUrl: './pedido-popup.component.scss'
})
export class PedidoPopupComponent {

  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Input() pedido: Pedido = {
    dataPedido: '',
    descricao: '',
    valor: 0,
    status: 'ACEITO' || 'RECUSADO',
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
  });

  ngOnChanges() {
    this.pedidoForm.patchValue(this.pedido);
  }

  onConfirm() {
    const { dataPedido, descricao, valor, status } = this.pedidoForm.value;

    this.confirm.emit({
      dataPedido: dataPedido || '',
      descricao: descricao || '',
      valor: valor || 0,
      status: 'ACEITO' || 'RECUSADO',
    });


    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
