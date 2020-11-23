import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
