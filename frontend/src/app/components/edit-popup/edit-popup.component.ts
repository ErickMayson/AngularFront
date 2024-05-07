import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Cliente} from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [

    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Input() cliente: Cliente = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  };

  @Output() confirm = new EventEmitter<Cliente>();

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  clienteForm = this.formBuilder.group({
    nome: ['', [Validators.required, this.specialCharacterValidator()]],
    email: [''],
    telefone: [''],
    endereco: [''],
  });

  ngOnChanges() {
    this.clienteForm.patchValue(this.cliente);
  }

  onConfirm() {
    const { nome, email, telefone, endereco } = this.clienteForm.value;

    this.confirm.emit({
      nome: nome || '',
      email: email || '',
      telefone: telefone || '',
      endereco: endereco || '',
    });


    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
