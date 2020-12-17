import { Component, OnInit } from '@angular/core';
import { faPen, faEdit, faTrash, faBriefcase, faPlusCircle, faTimesCircle, faArrowRight, faFile, faFileWord, faFileExcel, faFilePdf,
faFileArchive, faFilePowerpoint } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  categoriaInsertar='';

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

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  formEditarUsuario = new FormGroup({
    ur_newNombre: new FormControl('', [Validators.required]),
    ur_newApellido: new FormControl('', [Validators.required]),
    ur_newNacimiento: new FormControl('', [Validators.required]),
    ur_newEmpresa: new FormControl('', [Validators.required]),
    ur_newDescripcionEmpresa: new FormControl('', [Validators.required]),
    ur_newDireccionEmpresa: new FormControl('', [Validators.required])
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
  get ur_newDireccionEmpresa(): any {
    return this.formEditarUsuario.get('ur_newDireccionEmpresa');
  }
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  formNuevaEmpresa = new FormGroup({
    er_txtTitulo: new FormControl('', [Validators.required]),
    er_txtImagen: new FormControl('', [Validators.required]),
    er_txtIdentificador: new FormControl('', [Validators.required]),
    er_txtDescripcion: new FormControl('', [Validators.required]),
    er_txtPalabrasClave: new FormControl('', [Validators.required]),
    er_txtFavicon: new FormControl('', [Validators.required])
  });

  // Getters
  get er_txtTitulo(): any {
    return this.formNuevaEmpresa.get('er_txtTitulo');
  }
  get er_txtImagen(): any {
    return this.formNuevaEmpresa.get('er_txtImagen');
  }
  get er_txtIdentificador(): any {
    return this.formNuevaEmpresa.get('er_txtIdentificador');
  }
  get er_txtDescripcion(): any {
    return this.formNuevaEmpresa.get('er_txtDescripcion');
  }
  get er_txtPalabrasClave(): any {
    return this.formNuevaEmpresa.get('er_txtPalabrasClave');
  }
  get er_txtFavicon(): any {
    return this.formNuevaEmpresa.get('er_txtFavicon');
  }
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  formNuevoArchivo = new FormGroup({
    ar_txtNombre: new FormControl('', [Validators.required])
  });

  // Getters
  get ar_txtNombre(): any {
    return this.formNuevoArchivo.get('ar_txtNombre');
  }
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  formNuevaCategoria = new FormGroup({
    cr_txtNombre: new FormControl('', [Validators.required])
  });

  // Getters
  get cr_txtNombre(): any {
    return this.formNuevaCategoria.get('cr_txtNombre');
  }
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  formNuevoProducto = new FormGroup({
    cr_p_txtNombre: new FormControl('', [Validators.required]),
    cr_p_txtImagen: new FormControl('', [Validators.required]),
    cr_p_txtPrecio: new FormControl('', [Validators.required])
  });

  // Getters
  get cr_p_txtNombre(): any {
    return this.formNuevoProducto.get('cr_p_txtNombre');
  }
  get cr_p_txtImagen(): any {
    return this.formNuevoProducto.get('cr_p_txtImagen');
  }
  get cr_p_txtPrecio(): any {
    return this.formNuevoProducto.get('cr_p_txtPrecio');
  }
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  constructor(private httpClient: HttpClient, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('idUsuario') == null) {
      this.router.navigate(['/login']);
    } else {
      switch (localStorage.getItem('tipoUsuario')) {
        case 'Cliente':
          this.router.navigate(['/buyer']);
          break;
        case 'Administrador de plataforma':
          this.router.navigate(['/admin']);
          break;
      }
    }
    this.regionVisible = 'perfil';
    this.mostrarUsuario();
  }

  // Funciones
  cambiarRegion(rv): void {
    this.regionVisible = rv;
  }

  mostrarUsuario(): void {
    this.httpClient.get(`${this.backendHost}/usuarios/admin-business/${localStorage.getItem('idUsuario')}`)
    .subscribe(res=>{
      console.log(res);
      this.infoPerfil = res['respuesta'];
    });
  }

  editarUsuario(idUsuario): void {
    if (this.formEditarUsuario.valid) {
      console.log('Editar informacion de usuario: '+idUsuario);
      console.log(this.formEditarUsuario.value);
      this.httpClient.put(`${this.backendHost}/usuarios/${this.infoPerfil._id}`, this.formEditarUsuario.value)
      .subscribe(res=>{
        console.log(res);
        this.infoPerfil.nombre = this.ur_newNombre.value;
        this.infoPerfil.apellido = this.ur_newApellido.value;
        this.infoPerfil.fechaNacimiento = this.ur_newNacimiento.value;
        this.infoPerfil.nombreEmpresa = this.ur_newEmpresa.value;
        this.infoPerfil.descripcionEmpresa = this.ur_newDescripcionEmpresa.value;
        this.infoPerfil.direccionEmpresa = this.ur_newDireccionEmpresa.value;
        console.log('Usuario actualizado: ', this.infoPerfil);      
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

  crearEmpresa(): void {
    if (this.formNuevaEmpresa.valid) {
      console.log('Crear nueva empresa:');
      console.log(this.formNuevaEmpresa.value);
      // guardar empresa retornada
      this.httpClient.post(`${this.backendHost}/empresas`, this.formNuevaEmpresa.value)
      .subscribe(res=>{
        console.log(res);
        this.infoPerfil.empresas.push(res['respuesta']);
        this.formNuevaEmpresa.reset();
      });
      // this.infoPerfil.empresas.push(res['respuesta']);
      // this.formNuevaEmpresa.reset();
    } else {
      console.log(this.formNuevaEmpresa.errors);
      Object.keys(this.formNuevaEmpresa.controls).forEach(field => {
        const control = this.formNuevaEmpresa.get(field);
        control.markAsTouched({ onlySelf: true} )
      })
    }
  }

  editarEmpresa(idEmpresa): void {
    console.log('Empresa a editar: '+idEmpresa);
  }

  crearArchivo(): void {
    if (this.formNuevoArchivo.valid) {
      this.formNuevoArchivo.value['ar_txtRuta'] = 'storage/files/';
      let re = /(?:\.([^.]+))?$/;
      let ext = re.exec(this.formNuevoArchivo.get('ar_txtNombre').value)[1];
      if (ext=='docx'||ext=='doc') {
        this.formNuevoArchivo.value['ar_txtTipo'] = 'word';
      } else if (ext=='xlsx'||ext=='xls') {
        this.formNuevoArchivo.value['ar_txtTipo'] = 'excel';
      } else if (ext=='ppsx'||ext=='pptx') {
        this.formNuevoArchivo.value['ar_txtTipo'] = 'powerpoint';
      } else if (ext=='jpg'||ext=='png'||ext=='jpeg'||ext=='png'||ext=='png') {
        this.formNuevoArchivo.value['ar_txtTipo'] = 'imagen';
      } else if (ext=='pdf') {
        this.formNuevoArchivo.value['ar_txtTipo'] = 'pdf';
      } else if (ext=='zip'||ext=='rar'||ext=='7zip'||ext=='iso') {
        this.formNuevoArchivo.value['ar_txtTipo'] = 'zip';
      } else {
        this.formNuevoArchivo.value['ar_txtTipo'] = 'otro';
      }
      console.log('Crear nuevo archivo:');
      console.log(this.formNuevoArchivo.value);
      this.httpClient.post(`${this.backendHost}/archivos`, this.formNuevoArchivo.value)
      .subscribe(res=>{
        console.log(res);
        this.infoPerfil.archivos.push(res['respuesta']);
        this.formNuevoArchivo.reset();
      });
      // guardar archivo retornado
      // this.infoPerfil.archivo.push(res['respuesta']);
      // this.formNuevoArchivo.reset();
    } else {
      console.log(this.formNuevoArchivo.errors);
      Object.keys(this.formNuevoArchivo.controls).forEach(field => {
        const control = this.formNuevoArchivo.get(field);
        control.markAsTouched({ onlySelf: true} )
      })
    }
    
  }

  editarArchivo(idArchivo): void {
    console.log('Archivo a editar: '+idArchivo);
  }

  crearCategoria(): void {
    if (this.formNuevaCategoria.valid) {
      console.log('Crear nueva categoria');
      console.log(this.formNuevaCategoria.value);
      // guardar categoria retornada
      // this.infoPerfil.categorias.push(res['respuesta]);
      this.httpClient.post(`${this.backendHost}/categorias`, this.formNuevaCategoria.value)
      .subscribe(res=>{
        console.log(res);
        this.infoPerfil.categorias.push(res['respuesta']);
        this.formNuevaCategoria.reset();
      });
    } else {
      console.log(this.formNuevaCategoria.errors);
      Object.keys(this.formNuevaCategoria.controls).forEach(field => {
        const control = this.formNuevaCategoria.get(field);
        control.markAsTouched({ onlySelf: true} )
      })
    }
  }

  crearProducto(idCategoria): void {
    if (this.formNuevoProducto.valid) {
      console.log('Agregar producto a la categoria: '+idCategoria);
      console.log(this.formNuevoProducto.value);
      // guardar empresa retornada
      // for (let i = 0; i < this.infoPerfil.categorias.length; i++) {
      //   const c = this.infoPerfil.categorias[i];
      //   if (c._id == idCategoria) {
      //     c.productos.push(res['respuesta']);
      //     break;
      //   }
      // }
      this.formNuevoProducto.reset();
    } else {
      console.log(this.formNuevoProducto.errors);
      Object.keys(this.formNuevoProducto.controls).forEach(field => {
        const control = this.formNuevoProducto.get(field);
        control.markAsTouched({ onlySelf: true} )
      })
    }
  }

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  abrirEditarUsuario(modal, idUsuario):void {
    // obtener usuario y establecer valores a formulario de edicion
    this.modalService.open(modal, {size: 'lg'});
    this.httpClient.get(`${this.backendHost}/usuarios/${idUsuario}`)
    .subscribe(res=>{
      console.log(res);
      this.formEditarUsuario.get('ur_newNombre').setValue(res['respuesta']['nombre']);
      this.formEditarUsuario.get('ur_newApellido').setValue(res['respuesta']['apellido']);
      this.formEditarUsuario.get('ur_newNacimiento').setValue(res['respuesta']['fechaNacimiento']);
      this.formEditarUsuario.get('ur_newEmpresa').setValue(res['respuesta']['nombreEmpresa']);
      this.formEditarUsuario.get('ur_newDescripcionEmpresa').setValue(res['respuesta']['descripcionEmpresa']);
      this.formEditarUsuario.get('ur_newDireccionEnmpresa').setValue(res['respuesta']['direccionEmpresa']);
    });
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

  abrirNuevoProducto(modal, idCategoria):void {
    this.modalService.open(modal, {size: 'lg'});
    this.categoriaInsertar = idCategoria;
  }

}
