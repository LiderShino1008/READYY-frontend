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
    this.mostrarEmpresas();
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
    this.httpClient.get(`${this.backendHost}/empresas/companies-list`)
    .subscribe(res=>{
      this.listaEmpresas = res['respuesta'];
      console.log(res);
    });
  }

}
