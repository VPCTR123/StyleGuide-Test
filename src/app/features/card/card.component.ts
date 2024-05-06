import { Component, EventEmitter, Input, Output, model, ModelSignal, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  
  title = input<string>("")
  popupClicked = output();
  //@Input() title: string = "Test Name";

  //@Output() popupClicked = new EventEmitter();

}
