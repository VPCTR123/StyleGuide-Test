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

  showIcon = input<boolean>(false);
  displayName = input<string>("DefaultName");
  toggled = output<boolean>();

  public open:boolean = true;

}
