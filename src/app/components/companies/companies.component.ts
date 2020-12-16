import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

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
  backendHost: String = 'http://localhost:8888';

  // Fontawesome
  faShoppingCart = faShoppingCart;
  faTimesCircle = faTimesCircle;

  constructor(private httpClient: HttpClient) { }

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
    this.httpClient.get(`${this.backendHost}/empresas/companies-list`)
    .subscribe(res=>{
      this.listaEmpresas = res['respuesta'];
      console.log(res);
    });
  }

}
