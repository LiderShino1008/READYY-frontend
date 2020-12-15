import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-form-business-admin',
  templateUrl: './form-business-admin.component.html',
  styleUrls: ['./form-business-admin.component.css']
})
export class FormBusinessAdminComponent implements OnInit, OnChanges {
  // Declaraciones
  listaPlanes: any = [];
  @Input() public valorUT: string;
  emailYaExiste: Boolean;
  backendHost: String = 'http://localhost:8888';

  formularioSignup = new FormGroup({
    ur_txtTipoUsuario: new FormControl(''),
    ur_txtNombre: new FormControl('', [Validators.required]),
    ur_txtApellido: new FormControl('', [Validators.required]),
    ur_txtNacimiento: new FormControl('', [Validators.required]),
    ur_txtEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    ur_txtPwd1: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')]),
    ur_txtPwd2: new FormControl('', [Validators.required, this.pwdCheck]),
    ur_txtPlan: new FormControl('', [Validators.required]),
    ur_txtEmpresa: new FormControl('', [Validators.required]),
    ur_txtDireccion: new FormControl('', [Validators.required]),
    ur_txtDescripcion: new FormControl('', [Validators.required])
  });

  // Getters
  get ur_txtNombre(): any {
    return this.formularioSignup.get('ur_txtNombre');
  }
  get ur_txtApellido(): any {
    return this.formularioSignup.get('ur_txtApellido');
  }
  get ur_txtNacimiento(): any {
    return this.formularioSignup.get('ur_txtNacimiento');
  }
  get ur_txtEmail(): any {
    return this.formularioSignup.get('ur_txtEmail');
  }
  get ur_txtPwd1(): any {
    return this.formularioSignup.get('ur_txtPwd1');
  }
  get ur_txtPwd2(): any {
    return this.formularioSignup.get('ur_txtPwd2');
  }
  get ur_txtPlan(): any {
    return this.formularioSignup.get('ur_txtPlan');
  }
  get ur_txtEmpresa(): any {
    return this.formularioSignup.get('ur_txtEmpresa');
  }
  get ur_txtDireccion(): any {
    return this.formularioSignup.get('ur_txtDireccion');
  }
  get ur_txtDescripcion(): any {
    return this.formularioSignup.get('ur_txtDescripcion');
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    // Asignar valor al atributo correspondiente del objeto FormGroup
    this.formularioSignup.patchValue({
      ur_txtTipoUsuario: changes.valorUT.currentValue
    });
  }

  ngOnInit(): void {
    this.emailYaExiste = false;
    this.mostrarPlanes();
    this.formularioSignup.get('ur_txtPwd1').valueChanges.subscribe( x => {
      this.formularioSignup.controls.ur_txtPwd2.updateValueAndValidity();
    });
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

  pwdCheck(control) {
    if (control.value != null) {
      let ur_pwd2 = control.value;
      let pass = control.root.get('ur_txtPwd1');
      if (pass) {
        let ur_pwd1 = pass.value;
        if ((ur_pwd2!=='') && (ur_pwd1!=='') && (ur_pwd2!==ur_pwd1)) {
          return {passwordValidity: true};
        } else {
          return null;
        }
      }
    }
  }
  
  guardarUsuario(): void {
    if (this.formularioSignup.valid) {
      this.httpClient.post(`${this.backendHost}/usuarios`,this.formularioSignup.value)
      .subscribe((res:any)=>{
        console.log(res);        
        if (res['codigo'] == 0) {
          this.emailYaExiste = true;
          this.formularioSignup.get('ur_txtEmail').valueChanges.subscribe(()=>{
            this.emailYaExiste = false;            
          });
          alert(res['mensaje']);
        } else if(res['codigo'] == 1) {
          alert(res['mensaje']);
          this.formularioSignup.reset();
          this.router.navigate(['/login']);
          // Guardar _id, tipoUsuario en localStorage | sessionStorage
          // redireccionar a login
        } else {
          console.log(res);
        }
      });
    }
    else {
      console.log(this.formularioSignup.errors);
      Object.keys(this.formularioSignup.controls).forEach(field => {
        const control = this.formularioSignup.get(field);
        control.markAsTouched({ onlySelf: true} )
      })
    }
  }

}
