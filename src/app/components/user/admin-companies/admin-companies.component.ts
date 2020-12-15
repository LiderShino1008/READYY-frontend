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
    this.httpClient.get(`${this.backendHost}/usuarios/${'5fd0afcee1907e1cf0fd5581'}`)
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

  /*mostrarEmpresas(): void {
    this.listaEmpresas =
    [{
      __id: '31cae5f498bea',
      titulo: 'La Montaña 105.7 FM',
      imagen: 'assets/img/favicon.png',
      identificador: 'empresa-uno-1',
      descripcion: 'Página principal de nuestra empresa, aquí puedes conocer nuestra programación radial.',
      palabrasClaves: ['', '', '', '', ''],
      favicon: 'assets/img/favicon.png'
    },
    {
      __id: '14cae5f498cfff',
      titulo: 'Contrataciones y eventos',
      imagen: 'assets/img/favicon.png',
      identificador: 'empresa-dos-2',
      descripcion: 'Página principal de nuestra empresa, aquí puedes conocer nuestra programación radial.',
      palabrasClaves: ['k87', '8kn', 'ge2grr6', 'gg', 'e'],
      favicon: 'assets/img/favicon.png'
    },
    {
      __id: '99cae5f498dcb',
      titulo: 'Cualquier cosa jaja',
      imagen: 'assets/img/favicon.png',
      identificador: 'empresa-tres-3',
      descripcion: 'Página principal de nuestra empresa, aquí puedes conocer nuestra programación radial.',
      palabrasClaves: ['b', 'f43f', 'f', 'wer3', 'ads'],
      favicon: 'assets/img/favicon.png'
    }];
  }

  mostrarArchivos(): void {
    this.listaArchivos =
    [{
      __id: '56bcv554shj379',
      imagen: 'assets/img/favicon.png',
      tipoArchivo: 'imagen',
      nombre: 'Foto_86462v34re2f.jpg'
    },
    {
      __id: '56bcv554shj379',
      tipoArchivo: 'word',
      nombre: 'Documento_informe_exposición_ejemplo.docx'
    },
    {
      __id: '56bcv554shj379',
      tipoArchivo: 'pdf',
      nombre: 'doc_adwed345_435hgdfaatnasfd_5876.pdf'
    },
    {
      __id: '56bcv554shj379',
      tipoArchivo: 'excel',
      nombre: 'hoja de calculo.xlsx',
    },
    {
      __id: '56bcv554shj379',
      tipoArchivo: 'powerpoint',
      nombre: 'presentación diapositivas en pp.ppsx'
    },
    {
        __id: '56bcv554shj379',
        tipoArchivo: 'zip',
      nombre: 'doc_adwed345_435hgdfaatnasfd_5876.zip'
    },
    {
      __id: '56bcv554shj379',
      tipoArchivo: 'otro',
      nombre: 'doc_adwed345_435hgdfaatnasfd_5876.exe'
    }];
  }

  mostrarCategorias(): void {
    this.listaCategorias =
    [{
      __id: '56bcv554shj379',
      nombre: 'Ropa y calzado',
      productos: [{
        __id: '56tye5trh',
        nombre: 'Camisa masculina Marca Gucci Talla M color azul',
        imagen: 'assets/img/favicon.png',
        precio: '1687.65'
      },
      {
        __id: '2er54385',
        nombre: 'Camisa femenenina Marca Coco Channel Talla S color rojo',
        imagen: 'assets/img/favicon.png',
        precio: '1235.65'
      }]
    },
    {
      __id: '56bcv554shj379',
      nombre: 'Accesorios para vehículo',
      productos: [{
        __id: '6te54n54n76',
        nombre: 'Cargador celular con adaptador de corriente',
        imagen: 'assets/img/favicon.png',
        precio: '400.65'
      },
      {
        __id: 'tyju76ijf',
        nombre: 'Aromatizante Glass',
        imagen: 'assets/img/favicon.png',
        precio: '120.65'
      }]
    }];
  }*/

}
