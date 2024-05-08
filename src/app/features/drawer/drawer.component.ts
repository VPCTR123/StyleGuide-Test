import { CommonModule, NgIf } from '@angular/common';
import { Component, output } from '@angular/core';
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
  displayName = input<string>("DefaultName");
  
  //state = true => Open
  //state = false => closed
  toggled = output<{state: boolean, displayName: string}>();

  public open:boolean = true;

   handleToggled()
  {
    this.toggled.emit({
      state: this.open,
      displayName: this.displayName()
    });
  }

}
