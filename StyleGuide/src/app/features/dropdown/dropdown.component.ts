import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  options = input<string[]>();

  selection = output<any>();

  optionSelected($event:any)
  {

  }

}
