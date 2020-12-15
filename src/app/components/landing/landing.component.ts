import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  // Declaraciones
  listaPlanes: any = [];
  listaEmpresas: any = [];
  backendHost: String = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.mostrarPlanes();
    // this.mostrarEmpresas();
  }

  // Funciones
  mostrarPlanes(): void {
    this.httpClient.get(`${this.backendHost}/planes`)
    .subscribe(res=>{
      if (res['codigo'] == 1) {
        this.listaPlanes = res['respuesta'];
      } else {
        console.log(res['mensaje']);
      }
    });
  }

  mostrarEmpresas(): void {
    this.httpClient.get(`${this.backendHost}/empresas`)
    .subscribe(res=>{
      //this.listaEmpresas = res;
      console.log(res);
    });
  //   this.listaEmpresas =
  //   [{
  //     nombre: 'Ejemplo 1',
  //     logo: 'assets/img/favicon.png',
  //     empresa: 'Compañía DS',
  //     descripcion: 'El mejor servicio de lavandería de la ciudad'
  //   },
  //   {
  //     nombre: 'Ejemplo 2',
  //     logo: 'assets/img/favicon.png',
  //     empresa: 'Compañía LOL',
  //     descripcion: 'Revista de entretenimiento en línea'
  //   },
  //   {
  //     nombre: 'Ejemplo 3',
  //     logo: 'assets/img/favicon.png',
  //     empresa: 'Compañía FM',
  //     descripcion: 'Música de calidad todos los días a toda hora'
  //   }];
  }

}
