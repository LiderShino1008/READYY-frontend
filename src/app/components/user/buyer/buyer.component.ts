import { Component, OnInit } from '@angular/core';
import { faPen, faTrash, faShoppingCart, faTimesCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  // Declaraciones
  infoPerfil: any;
  historialCompra: any = [];

  // Fontawesome
  faPen = faPen;
  faTrash = faTrash;
  faShoppingCart = faShoppingCart;
  faTimesCircle = faTimesCircle;
  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
    this.mostrarUsuario();
    this.mostrarHistorial();
    console.log(this.historialCompra.length);
  }

  // Funciones
  mostrarUsuario(): void {
    this.infoPerfil = {
      nombre: 'Juan Carlos',
      apellido: 'López Pérez',
      fechaNacimiento: '25/03/1997',
      fechaRegistro: '19/10/2020'
    };
  }

  mostrarHistorial(): void {
    this.historialCompra =
    [{
      nombre: 'Hamburguesa con doble queso de lujo',
      empresa: 'McDaniel\'s',
      fechaCompra: '01/01/2020',
      precio: 35,
      cantidad: 3,
      total: 105
    },
    {
      nombre: 'Pizza de jamón',
      empresa: 'Big Caesars',
      fechaCompra: '01/01/2020',
      precio: 35,
      cantidad: 3,
      total: 105
    },
    {
      nombre: 'Sushi california',
      empresa: 'Katana Sushi Bar',
      fechaCompra: '01/01/2020',
      precio: 35,
      cantidad: 3,
      total: 105
    }];
  }

  borrarHistorial(): void {
    console.log('Se borrarán' + this.historialCompra + 'productos del historial de compras.');
    this.historialCompra = [];
  }

}
