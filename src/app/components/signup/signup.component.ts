import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Declaraciones
  regionVisible = '';
  tipoU = new FormControl('', Validators.required);

  constructor(private router: Router) { }

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
    this.tipoU.reset();
  }

  // Funciones
  changeUserType(e): void {
    console.log(e.target.value);
    this.regionVisible = e.target.value;
  }
}
