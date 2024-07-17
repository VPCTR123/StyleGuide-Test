import { Component } from '@angular/core';
import { HeaderComponent } from '../../Features/header/header.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

}
