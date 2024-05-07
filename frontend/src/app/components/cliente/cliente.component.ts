import { Component, Input } from '@angular/core';
import { Cliente } from '../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {
  @Input() cliente!: Cliente; // ! assume que esse cliente será providenciado.



}
