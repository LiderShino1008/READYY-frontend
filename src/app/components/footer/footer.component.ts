import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {

  // Declaraciones
  @Input() public volverArriba: boolean;

  // Fontawesome Icons
  faArrowUp = faArrowUp;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.volverArriba.currentValue);
  }

  ngOnInit(): void {
  }

}
