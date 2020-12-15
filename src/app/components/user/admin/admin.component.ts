import { Component, OnInit } from '@angular/core';
import { faPen, faEdit, faBan, faTrash, faPlane, faPlusCircle, faTimesCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // Declaraciones
  regionVisible: string;

  infoPerfil: any;
  listaUsuarios: any;
  listaEmpresas: any;
  listaPlanes: any;

  actualEmpresa='';
  actualPlan='';

  backendHost: String = 'http://localhost:8888';

  // Fontawesome
  faPen = faPen;
  faEdit = faEdit;
  faBan = faBan;
  faTrash = faTrash;
  faPlane = faPlane;
  faTimesCircle = faTimesCircle;
  faArrowRight = faArrowRight;
  faPlusCircle = faPlusCircle;

  constructor(private httpClient: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.regionVisible = 'perfil';
    this.mostrarUsuario();
    this.obtenerUsuarios();
    this.obtenerEmpresas();
    this.obtenerPlanes();
  }

  // Funciones
  cambiarRegion(rv): void {
    this.regionVisible = rv;
  }

  mostrarUsuario(): void {
    this.httpClient.get(`${this.backendHost}/usuarios/ac/${'5fd0b0a0e1907e1cf0fd5583'}`)
    .subscribe(res=>{
      console.log(res);
      this.infoPerfil = {
        nombre: res['respuesta']['nombre'],
        apellido: res['respuesta']['apellido'],
        fechaNacimiento: res['respuesta']['fechaNacimiento']
      };
    });
  }

  obtenerUsuarios(): void {
    this.httpClient.get(`${this.backendHost}/usuarios`)
    .subscribe(res=>{
      console.log(res);
      this.listaUsuarios = res['respuesta'];
    });
  }

  obtenerEmpresas(): void {
    this.httpClient.get(`${this.backendHost}/empresas`)
    .subscribe(res=>{
      console.log(res);
      this.listaEmpresas = res['respuesta'];
    });
  }
  obtenerPlanes(): void {
    this.httpClient.get(`${this.backendHost}/planes`)
    .subscribe(res=>{
      console.log(res);
      this.listaPlanes = res['respuesta'];
    });
  }
  
  editarUsuario(idUsuario): void {}
  
  crearUsuario(): void {}
  
  editarEmpresa(idEmpresa): void {}
  
  crearPlan(): void {}

  editarPlan(idPlan): void {}

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  abrirNuevoUsuario(modal):void {
    this.modalService.open(modal, {size: 'lg'})
  }

  abrirEditarUsuario(modal, idUsuario):void {
    this.modalService.open(modal, {size: 'lg'})
  }

  borrarUsuario(id): void {
    // peticion ? borrar de this.listaPlanes : alert con mensaje de error
  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  abrirEditarEmpresa(modal, idEmpresa): void {
    this.modalService.open(modal, {size: 'lg'})
  }

  desbloquearEmpresa(id): void {
    // peticion ? borrar de this.listaPlanes : alert con mensaje de error
  }

  bloquearEmpresa(id): void {
    // peticion ? borrar de this.listaPlanes : alert con mensaje de error
  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  abriNuevoPlan(modal): void {
    this.modalService.open(modal, {size: 'lg'})
  }

  abrirEditarPlan(modal, id): void {
    this.modalService.open(modal, {size: 'lg'})
  }

  borrarPlan(id): void {
    // peticion ? borrar de this.listaPlanes : alert con mensaje de error
  }

}
