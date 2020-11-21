import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Declaraciones
  formularioLogin = new FormGroup({
    txtEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    txtPassword: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')])
  });

  // Getters
  get txtEmail(): any {
    return this.formularioLogin.get('txtEmail');
  }
  get txtPassword(): any {
    return this.formularioLogin.get('txtPassword');
  }

  constructor() { }

  ngOnInit(): void {
  }

  // Funciones
  validarLogin(): void {
    if (this.formularioLogin.valid) {
      console.log(this.formularioLogin.value);
    }
    else {
      console.log(this.formularioLogin.errors);
    }
  }

}
