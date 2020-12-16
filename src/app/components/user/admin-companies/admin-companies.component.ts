import { Component, OnInit } from '@angular/core';
import { faPen, faEdit, faTrash, faBriefcase, faPlusCircle, faTimesCircle, faArrowRight, faFile, faFileWord, faFileExcel, faFilePdf,
faFileArchive, faFilePowerpoint } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent implements OnInit {

  // Declaraciones
  regionVisible: string;

  infoPerfil: any;
  
  actualEmpresa='';
  actualArchivo='';

  backendHost: String = 'http://localhost:8888';

  // Fontawesome
  faPen = faPen;
  faEdit = faEdit;
  faTrash = faTrash;
  faBriefcase = faBriefcase;
  faTimesCircle = faTimesCircle;
  faArrowRight = faArrowRight;
  faPlusCircle = faPlusCircle;
  faFile = faFile;
  faFileWord = faFileWord;
  faFileExcel = faFileExcel;
  faFilePdf = faFilePdf;
  faFileArchive = faFileArchive;
  faFilePowerpoint = faFilePowerpoint;

  constructor(private httpClient: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.regionVisible = 'perfil';
    this.mostrarUsuario();
  }

  // Funciones
  cambiarRegion(rv): void {
    this.regionVisible = rv;
  }

  mostrarUsuario(): void {
    this.httpClient.get(`${this.backendHost}/usuarios/admin-business/${'5fd0afcee1907e1cf0fd5581'}`)
    .subscribe(res=>{
      console.log(res);
      this.infoPerfil = res['respuesta'];
    });
  }

  editarUsuario(): void {}

  crearEmpresa(): void {}

  crearArchivo(): void {}

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  abrirEditarUsuario(modal, idUsuario):void {
    // obtener usuario y establecer valores a formulario de edicion
    this.modalService.open(modal, {size: 'lg'});
  }

  abrirNuevaEmpresa(modal):void {
    this.modalService.open(modal, {size: 'lg'});
  }

  abrirEditarEmpresa(modal, idEmpresa):void {
    // obtener empresa y establecer valores a formulario de edicion
    this.modalService.open(modal, {size: 'lg'});
    this.actualEmpresa = idEmpresa;
  }

  abrirNuevoArchivo(modal):void {
    this.modalService.open(modal, {size: 'lg'});
  }

  abrirEditarArchivo(modal, idArchivo):void {
    // obtener archivo y establecer valores a formulario de edicion
    this.modalService.open(modal, {size: 'lg'});
    this.actualArchivo = idArchivo;
  }

}
