import { Component, OnInit } from '@angular/core';
import { faPen, faTrash, faShoppingCart, faTimesCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  formEditarUsuario = new FormGroup({
      ur_newNombre: new FormControl('', [Validators.required]),
      ur_newApellido: new FormControl('', [Validators.required]),
      ur_newNacimiento: new FormControl('', [Validators.required])
    });
  
    // Getters
    get ur_newNombre(): any {
      return this.formEditarUsuario.get('ur_newNombre');
    }
    get ur_newApellido(): any {
      return this.formEditarUsuario.get('ur_newApellido');
    }
    get ur_newNacimiento(): any {
      return this.formEditarUsuario.get('ur_newNacimiento');
    }

  constructor(private httpClient: HttpClient, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('idUsuario') == null) {
      this.router.navigate(['/login']);
    } else {
      switch (localStorage.getItem('tipoUsuario')) {
        case 'Administrador de negocios':
          this.router.navigate(['/admin-companies']);
          break;
        case 'Administrador de plataforma':
          this.router.navigate(['/admin']);
          break;
      }
    }
    this.mostrarUsuario();
    console.log(this.infoPerfil.historialCompras.length);
  }

  // Funciones
  mostrarUsuario(): void {
    let iu = localStorage.getItem('idUsuario');
    this.httpClient.get(`${this.backendHost}/usuarios/${iu}`)
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
  
  editarUsuario(): void {
    console.log('Editar usuario con ID: ',this.infoPerfil._id);
    if (this.formEditarUsuario.valid) {
      console.log('Datos:');
      console.log(this.formEditarUsuario.value);
      this.httpClient.put(`${this.backendHost}/usuarios/${this.infoPerfil._id}`, this.formEditarUsuario.value)
      .subscribe(res=>{
        console.log(res);
        this.infoPerfil.nombre = this.ur_newNombre.value;
        this.infoPerfil.apellido = this.ur_newApellido.value;
        this.infoPerfil.fechaNacimiento = this.ur_newNacimiento.value;
        this.formEditarUsuario.reset();
      });
    } else {
      console.log(this.formEditarUsuario.errors);
      Object.keys(this.formEditarUsuario.controls).forEach(field => {
        const control = this.formEditarUsuario.get(field);
        control.markAsTouched({ onlySelf: true} )
      })
    }
  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  abrirEditarUsuario(modal, idUsuario):void {
    this.modalService.open(modal, {size: 'lg'});
    this.httpClient.get(`${this.backendHost}/usuarios/${idUsuario}`)
    .subscribe(res=>{
      console.log(res);
      this.formEditarUsuario.get('ur_newNombre').setValue(res['respuesta']['nombre']);
      this.formEditarUsuario.get('ur_newApellido').setValue(res['respuesta']['apellido']);
      this.formEditarUsuario.get('ur_newNacimiento').setValue(res['respuesta']['fechaNacimiento']);
    });
  }

}
