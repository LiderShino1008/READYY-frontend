import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Declaraciones
  regionVisible = '';
  tipoU = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit(): void {
    this.tipoU.reset();
  }

  // Funciones
  changeUserType(e): void {
    console.log(e.target.value);
    this.regionVisible = e.target.value;
  }
}
