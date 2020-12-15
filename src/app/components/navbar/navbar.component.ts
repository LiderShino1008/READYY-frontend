import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    console.log('ROUTE NAVBAR: ' + this.router.url);
    // this.currentUrl = this.router.url;
  }

  ngOnInit(): void {
  }

}
