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
  showdropdown: boolean = false;

  options = input<DropdownOption[]>();

  selected = output<DropdownOption>();
  currentSelection: DropdownOption = new DropdownOption();

  public onSelect(option:DropdownOption)
  {
    this.showdropdown = false;
    this.currentSelection = option;
    this.selected.emit(option);
  }

}

//Make a list of these, and pass them into the options input
export class DropdownOption
{
  name: string = "";
  value: any;
}
