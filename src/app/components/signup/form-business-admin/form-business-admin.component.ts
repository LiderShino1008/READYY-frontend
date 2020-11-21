import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-business-admin',
  templateUrl: './form-business-admin.component.html',
  styleUrls: ['./form-business-admin.component.css']
})
export class FormBusinessAdminComponent implements OnInit, OnChanges {
  // Declaraciones
  @Input() public valorUT: string;

  formularioSignup = new FormGroup({
    txtTipoUsuario: new FormControl(''),
    txtNombre: new FormControl('', [Validators.required]),
    txtApellido: new FormControl('', [Validators.required]),
    txtNacimiento: new FormControl('', [Validators.required]),
    txtEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    txtPwd1: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')]),
    txtPwd2: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')]),
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

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // Asignar valor al atributo correspondiente del objeto FormGroup
    this.formularioSignup.patchValue({
      txtTipoUsuario: changes.valorUT.currentValue
    });
  }

  ngOnInit(): void {}

  // Funciones
  guardarUsuario(): void {
    // if (this.formularioSignup.valid) {
      console.log(this.formularioSignup.value);
    // }
    // else {
    //   console.log(this.formularioSignup.errors);
    // }
  }

}
