import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Declaraciones
  backendHost: String = 'http://localhost:8888';

  formularioLogin = new FormGroup({
    sr_email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    sr_password: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')])
  });

  // Getters
  get sr_email(): any {
    return this.formularioLogin.get('sr_email');
  }
  get sr_password(): any {
    return this.formularioLogin.get('sr_password');
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('idUsuario') != null) {
      switch (localStorage.getItem('tipoUsuario')) {
        case 'Cliente':
          this.router.navigate(['/buyer']);
          break;
        case 'Administrador de negocios':
          this.router.navigate(['/admin-companies']);
          break;
        case 'Administrador de plataforma':
          this.router.navigate(['/admin']);
          break;
      }
    }
  }

  // Funciones
  validarLogin(): void {
    if (this.formularioLogin.valid) {
      this.httpClient.post(`${this.backendHost}/session/login/`,this.formularioLogin.value)
      .subscribe((res:any)=>{
        console.log(res);        
        if (res['codigo'] == 0) {
          // this.formularioSignup.get('ur_txtEmail').valueChanges.subscribe(()=>{
          //   this.emailYaExiste = false;
          // });
          alert(res['mensaje']);
          Object.keys(this.formularioLogin.controls).forEach(field => {
            const control = this.formularioLogin.get(field);
            control.markAsTouched({ onlySelf: true} )
          })
        } else if(res['codigo'] == 1) {
          this.formularioLogin.reset();
          switch (res['tipoUsuario']) {
            case 'Cliente':
              localStorage.setItem('idUsuario', res['idUsuario']);
              localStorage.setItem('tipoUsuario', res['tipoUsuario']);
              this.router.navigate(['/buyer']);
              break;
            case 'Administrador de negocios':
              localStorage.setItem('idUsuario', res['idUsuario']);
              localStorage.setItem('tipoUsuario', res['tipoUsuario']);
              this.router.navigate(['/admin-companies']);
              break;
            case 'Administrador de plataforma':
              localStorage.setItem('idUsuario', res['idUsuario']);
              localStorage.setItem('tipoUsuario', res['tipoUsuario']);
              this.router.navigate(['/admin']);
              break;
          }
        } else {
          console.log(res);
        }
      });
    }
    else {
      console.log(this.formularioLogin.errors);
      Object.keys(this.formularioLogin.controls).forEach(field => {
        const control = this.formularioLogin.get(field);
        control.markAsTouched({ onlySelf: true} )
      })
    }
  }

}
