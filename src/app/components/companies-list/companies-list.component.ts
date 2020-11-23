import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  // Declaraciones
  listaEmpresas: any = [];

  verReset = false;
  txtBuscar = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit(): void {
    this.mostrarEmpresas();
  }

  // Funciones
  buscarEmpresas(): void {
    console.log(this.txtBuscar.value, this.txtBuscar.valid);
    this.verReset = true;
  }

  reiniciarBusqueda(): void {
    this.txtBuscar.reset();
    this.verReset = false;
  }

  mostrarEmpresas(): void {
    this.listaEmpresas =
    [{
      nombre: 'Ejemplo 1',
      logo: 'assets/img/favicon.png',
      empresa: 'Compañía DS',
      descripcion: 'El mejor servicio de lavandería de la ciudad'
    },
    {
      nombre: 'Ejemplo 2',
      logo: 'assets/img/favicon.png',
      empresa: 'Compañía LOL',
      descripcion: 'Revista de entretenimiento en línea'
    },
    {
      nombre: 'Ejemplo 3',
      logo: 'assets/img/favicon.png',
      empresa: 'Compañía FM',
      descripcion: 'Música de calidad todos los días a toda hora'
    }];
  }

}
