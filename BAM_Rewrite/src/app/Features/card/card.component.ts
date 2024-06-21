import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, model, ModelSignal, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  
  title = input<string>("")
  thumbcolor = input<string>("")
  cardClicked = output();
  //@Input() title: string = "Test Name";

  //@Output() popupClicked = new EventEmitter();
 
}
