import { Component, OnInit } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  // Fontawesome Icons
  faArrowUp = faArrowUp;

  constructor() { }

  ngOnInit(): void {
  }

}
