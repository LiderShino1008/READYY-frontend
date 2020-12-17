import { Component, OnInit } from '@angular/core';
import { faPen, faEdit, faBan, faTrash, faPlane, faPlusCircle, faTimesCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  actualEmpresa:any;
  actualPlan:any
  actualUsuario:any;

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

formEditarUsuario = new FormGroup({
    ur_newNombre: new FormControl('', [Validators.required]),
    ur_newApellido: new FormControl('', [Validators.required]),
    ur_newNacimiento: new FormControl('', [Validators.required]),
    ur_newEmpresa: new FormControl('', [Validators.required]),
    ur_newDescripcionEmpresa: new FormControl('', [Validators.required]),
    ur_newDireccionEnmpresa: new FormControl('', [Validators.required])
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
  get ur_newEmpresa(): any {
    return this.formEditarUsuario.get('ur_newEmpresa');
  }
  get ur_newDescripcionEmpresa(): any {
    return this.formEditarUsuario.get('ur_newDescripcionEmpresa');
  }
  get ur_newDireccionEnmpresa(): any {
    return this.formEditarUsuario.get('ur_newDireccionEnmpresa');
  }

formCrearPlan = new FormGroup({
    pr_txtNombre: new FormControl(''),
    pr_txtPrecio: new FormControl('', [Validators.required]),
    pr_txtEmpresas: new FormControl('', [Validators.required]),
    pr_txtCategorias: new FormControl('', [Validators.required]),
    pr_txtProductos: new FormControl('', [Validators.required]),
    pr_txtArchivos: new FormControl('', [Validators.required])
  });

  // Getters
  get pr_txtNombre(): any {
    return this.formCrearPlan.get('pr_txtNombre');
  }
  get pr_txtPrecio(): any {
    return this.formCrearPlan.get('pr_txtPrecio');
  }
  get pr_txtEmpresas(): any {
    return this.formCrearPlan.get('pr_txtEmpresas');
  }
  get pr_txtCategorias(): any {
    return this.formCrearPlan.get('pr_txtCategorias');
  }
  get pr_txtProductos(): any {
    return this.formCrearPlan.get('pr_txtProductos');
  }
  get pr_txtArchivos(): any {
    return this.formCrearPlan.get('pr_txtArchivos');
  }

  constructor(private httpClient: HttpClient, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('idUsuario') == null) {
      this.router.navigate(['/login']);
    } else {
      switch (localStorage.getItem('tipoUsuario')) {
        case 'Cliente':
          this.router.navigate(['/buyer']);
          break;
        case 'Administrador de negocios':
          this.router.navigate(['/admin-companies']);
          break;
      }
    }
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
    let iu = localStorage.getItem('idUsuario');
    this.httpClient.get(`${this.backendHost}/usuarios/${iu}`)
    .subscribe(res=>{
      console.log(res);
      this.infoPerfil = res['respuesta'];
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
  
  editarUsuario(): void {
    console.log('Editar usuario con ID: ',this.actualUsuario._id);
    if (this.formEditarUsuario.valid) {
      console.log('Datos:');
      if (this.actualUsuario.tipoUsuario == 'Administrador de negocios') {
        console.log(this.formEditarUsuario.value);
        for (let i = 0; i < this.listaUsuarios.length; i++) {
          const u = this.listaUsuarios[i];
          if (u._id == this.actualUsuario._id) {
            u.nombre = this.ur_newNombre.value;
            u.apellido = this.ur_newApellido.value;
            u.fechaNacimiento = this.ur_newNacimiento.value;
            u.nombreEmpresa = this.ur_newEmpresa.value;
            u.descripcionEmpresa = this.ur_newDescripcionEmpresa.value;
            u.direccionEmpresa = this.ur_newDireccionEnmpresa.value;
            break;
          }
        }
        this.formEditarUsuario.reset();
      } else {
        delete this.formEditarUsuario.value.ur_newEmpresa;
        delete this.formEditarUsuario.value.ur_newDescripcionEmpresa;
        delete this.formEditarUsuario.value.ur_newDireccionEnmpresa;
        console.log(this.formEditarUsuario.value);
        if (this.actualUsuario._id == localStorage.getItem('idUsuario')) {
          this.infoPerfil.nombre = this.ur_newNombre.value;
          this.infoPerfil.apellido = this.ur_newApellido.value;
          this.infoPerfil.fechaNacimiento = this.ur_newNacimiento.value;
        } else {
          for (let i = 0; i < this.listaUsuarios.length; i++) {
            const u = this.listaUsuarios[i];
            if (u._id == this.actualUsuario._id) {
              u.nombre = this.ur_newNombre.value;
              u.apellido = this.ur_newApellido.value;
              u.fechaNacimiento = this.ur_newNacimiento.value;
              break;
            }
          }
        }
        this.formEditarUsuario.reset();   
      }
    } else {
      console.log(this.formEditarUsuario.errors);
      Object.keys(this.formEditarUsuario.controls).forEach(field => {
        const control = this.formEditarUsuario.get(field);
        control.markAsTouched({ onlySelf: true} )
      })
    }
  }
  
  crearUsuario(): void {}
  
  editarEmpresa(idEmpresa): void {}
  
  crearPlan(): void {
    if (this.formCrearPlan.valid) {
      console.log('Crear nuevo plan');      
      console.log(this.formCrearPlan.value);
      this.formCrearPlan.reset();
    } else {
      console.log(this.formCrearPlan.errors);
      Object.keys(this.formCrearPlan.controls).forEach(field => {
        const control = this.formCrearPlan.get(field);
        control.markAsTouched({ onlySelf: true} )
      })
    }
    
  }

  editarPlan(idPlan): void {}

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  abrirNuevoUsuario(modal):void {
    this.modalService.open(modal, {size: 'lg'});
  }

  abrirEditarUsuario(modal, idUsuario):void {
    this.modalService.open(modal, {size: 'lg'});
    this.httpClient.get(`${this.backendHost}/usuarios/${idUsuario}`)
    .subscribe(res=>{
      console.log(res);
      if (res['respuesta']['tipoUsuario'] == 'Administrador de negocios') {
        this.actualUsuario = '';
        this.actualUsuario['_id'] = res['respuesta']['_id'];
        this.actualUsuario['tipoUsuario'] = res['respuesta']['tipoUsuario'];
        this.formEditarUsuario.get('ur_newNombre').setValue(res['respuesta']['nombre']);
        this.formEditarUsuario.get('ur_newApellido').setValue(res['respuesta']['apellido']);
        this.formEditarUsuario.get('ur_newNacimiento').setValue(res['respuesta']['fechaNacimiento']);
        this.formEditarUsuario.get('ur_newEmpresa').setValue(res['respuesta']['nombreEmpresa']);
        this.formEditarUsuario.get('ur_newDescripcionEmpresa').setValue(res['respuesta']['descripcionEmpresa']);
        this.formEditarUsuario.get('ur_newDireccionEnmpresa').setValue(res['respuesta']['direccionEmpresa']);
      } else {
        this.actualUsuario = '';
        this.actualUsuario['_id'] = res['respuesta']['_id'];
        this.actualUsuario['tipoUsuario'] = res['respuesta']['tipoUsuario'];
        this.formEditarUsuario.get('ur_newNombre').setValue(res['respuesta']['nombre']);
        this.formEditarUsuario.get('ur_newApellido').setValue(res['respuesta']['apellido']);
        this.formEditarUsuario.get('ur_newNacimiento').setValue(res['respuesta']['fechaNacimiento']);
      }
    });
  }

  borrarUsuario(id): void {
    // peticion ? borrar de this.listaPlanes : alert con mensaje de error
  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  desbloquearEmpresa(id): void {
    this.httpClient.put(`${this.backendHost}/empresas/${id}/estado`, {er_newEstado: true})
    .subscribe(res=>{
      console.log(res);
      for (let i = 0; i < this.listaEmpresas.length; i++) {
        const em = this.listaEmpresas[i];
        if (em._id == id) {
          em.estado = true;
          break;
        }
      }
    });
  }

  bloquearEmpresa(id): void {
    this.httpClient.put(`${this.backendHost}/empresas/${id}/estado`, {er_newEstado: false})
    .subscribe(res=>{
      console.log(res);
      for (let i = 0; i < this.listaEmpresas.length; i++) {
        const em = this.listaEmpresas[i];
        if (em._id == id) {
          em.estado = false;
          break;
        }
      }
    });
  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  abrirNuevoPlan(modal): void {
    this.modalService.open(modal, {size: 'lg'})
  }

  abrirEditarPlan(modal, id): void {
    this.modalService.open(modal, {size: 'lg'})
  }

  borrarPlan(id): void {
    // peticion ? borrar de this.listaPlanes : alert con mensaje de error
  }

}
