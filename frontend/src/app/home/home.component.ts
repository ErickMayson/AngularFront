import { Component } from '@angular/core';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor(
      private clientesService: ClientesService
    ) { }

    ngOnInit() {
      this.clientesService.getClientes().subscribe((clientes)) => {
        console.log(clientes)
      }
    }

}
