import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  // Declaraciones
  listaEmpresas: any = [];
  verReset = false;
  txtBuscar = new FormControl('', Validators.required);

  // Fontawesome
  faShoppingCart = faShoppingCart;
  faTimesCircle = faTimesCircle;

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
