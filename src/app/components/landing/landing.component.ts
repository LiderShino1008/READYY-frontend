import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  // Declaraciones
  listaPlanes: any = [];
  listaEmpresas: any = [];

  constructor() { }

  ngOnInit(): void {
    this.mostrarPlanes();
    this.mostrarEmpresas();
  }

  // Funciones
  mostrarPlanes(): void {
    this.listaPlanes =
    [{
      nombre: 'Principiante',
      precio: 0,
      paginas: 2,
      categorias: 6,
      productos: 10,
      archivos: 30
    },
    {
      nombre: 'Avanzado',
      precio: 12,
      paginas: 4,
      categorias: 12,
      productos: 24,
      archivos: 60
    },
    {
      nombre: 'Profesional',
      precio: 25,
      paginas: 8,
      categorias: 24,
      productos: 48,
      archivos: 120
    }];
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
