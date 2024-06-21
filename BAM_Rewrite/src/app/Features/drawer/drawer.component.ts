import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { input} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [FormsModule,CommonModule, NgIf],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {

  // Cant get this to work but it'd be nice
  // to have stuff like this
  //showIcon = input<boolean>(false);

  drawer_handle = input<string>("");

  drawer = input<string>("");

  icon = input<string>("");


  displayName = input<string>("");
  
  //state = true => Open
  //state = false => closed
  toggled = output<{state: boolean, displayName: string}>();

  //public open:boolean = true;
  @Input() open = false;

   handleToggled()
  {  
    this.open = !this.open;  
    this.toggled.emit({
      state: this.open,
      displayName: this.displayName()
    });
  }

}
