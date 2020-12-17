import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Condiciones elementos visibles
  isLogged = false;
  isAdmin = false;
  isAdminCompanies = false;
  isBuyer = false;
  currentUrl: string;
  backendHost: String = 'http://localhost:8888';

  constructor(private httpClient: HttpClient, private location: Location, private router: Router) {
    this.router.events.subscribe(val => {
      setTimeout(()=> {
        this.currentUrl = location.path();
      }, 1000);
      if ((location.path() == "/buyer") || (location.path() == "/buyer") || (location.path() == "/buyer")) {
        this.checkUser();
      }
    });
  }

  ngOnInit(): void {
    this.checkUser();
  }

  // Funciones
  checkUser() {
    if(localStorage.getItem('idUsuario') != null) {
      this.isLogged = true;
      switch (localStorage.getItem('tipoUsuario')) {
        case 'Cliente':
          this.isAdmin = false;
          this.isAdminCompanies = false;
          this.isBuyer = true;
          break;
        case 'Administrador de negocios':
          this.isAdmin = false;
          this.isAdminCompanies = true;
          this.isBuyer = false;
          break;
        case 'Administrador de plataforma':
          this.isAdmin = true;
          this.isAdminCompanies = false;
          this.isBuyer = false;
          break;
      }
    } else {
      this.isLogged = false;
      this.isAdmin = false;
      this.isAdminCompanies = false;
      this.isBuyer = false;
    }
  }

  logout() {
    this.httpClient.post(`${this.backendHost}/session/logout`, {})
    .subscribe(res=>{
      console.log(res);
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('tipoUsuario');
      this.router.navigate(['/home']);
    });
  }

}
