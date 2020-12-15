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
    txtTipoUsuario: new FormControl(''),
    txtNombre: new FormControl('', [Validators.required]),
    txtApellido: new FormControl('', [Validators.required]),
    txtNacimiento: new FormControl('', [Validators.required]),
    txtEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    txtPwd1: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')]),
    txtPwd2: new FormControl('', [Validators.required, this.pwdCheck]),
    txtPlan: new FormControl('', [Validators.required]),
    txtEmpresa: new FormControl('', [Validators.required]),
    txtDireccion: new FormControl('', [Validators.required]),
    txtDescripcion: new FormControl('', [Validators.required])
  });

  // Getters
  get txtNombre(): any {
    return this.formularioSignup.get('txtNombre');
  }
  get txtApellido(): any {
    return this.formularioSignup.get('txtApellido');
  }
  get txtNacimiento(): any {
    return this.formularioSignup.get('txtNacimiento');
  }
  get txtEmail(): any {
    return this.formularioSignup.get('txtEmail');
  }
  get txtPwd1(): any {
    return this.formularioSignup.get('txtPwd1');
  }
  get txtPwd2(): any {
    return this.formularioSignup.get('txtPwd2');
  }
  get txtPlan(): any {
    return this.formularioSignup.get('txtPlan');
  }
  get txtEmpresa(): any {
    return this.formularioSignup.get('txtEmpresa');
  }
  get txtDireccion(): any {
    return this.formularioSignup.get('txtDireccion');
  }
  get txtDescripcion(): any {
    return this.formularioSignup.get('txtDescripcion');
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    // Asignar valor al atributo correspondiente del objeto FormGroup
    this.formularioSignup.patchValue({
      txtTipoUsuario: changes.valorUT.currentValue
    });
  }

  ngOnInit(): void {
    this.emailYaExiste = false;
    this.mostrarPlanes();
    this.formularioSignup.get('txtPwd1').valueChanges.subscribe( x => {
      this.formularioSignup.controls.txtPwd2.updateValueAndValidity();
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
      let pwd2 = control.value;
      let pass = control.root.get('txtPwd1');
      if (pass) {
        let pwd1 = pass.value;
        if ((pwd2!=='') && (pwd1!=='') && (pwd2!==pwd1)) {
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
          this.formularioSignup.get('txtEmail').valueChanges.subscribe(()=>{
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
