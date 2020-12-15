import { Component, OnInit } from '@angular/core';
import { faPen, faTrash, faShoppingCart, faTimesCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  // Declaraciones
  infoPerfil: any;
  historialCompras: any = [];
  backendHost: String = 'http://localhost:8888';

  // Fontawesome
  faPen = faPen;
  faTrash = faTrash;
  faShoppingCart = faShoppingCart;
  faTimesCircle = faTimesCircle;
  faArrowRight = faArrowRight;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.mostrarUsuario();
    console.log(this.infoPerfil.historialCompras.length);
  }

  // Funciones
  mostrarUsuario(): void {
    this.httpClient.get(`${this.backendHost}/usuarios/${'5fd0b081e1907e1cf0fd5582'}`)
    .subscribe(res=>{
      console.log(res);
      this.infoPerfil = {
        nombre: res['respuesta']['nombre'],
        apellido: res['respuesta']['apellido'],
        fechaNacimiento: res['respuesta']['fechaNacimiento'],
        historialCompras: res['respuesta']['historialCompras']
      };
    });
  }

  borrarHistorial(): void {
    console.log('Se borrarán' + this.historialCompras + 'productos del historial de compras.');
    this.infoPerfil.historialCompras = [];
  }

}
