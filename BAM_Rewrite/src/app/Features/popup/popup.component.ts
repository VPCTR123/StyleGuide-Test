import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  // The parent component will controll whether or not this component is shown,
  // so this component will simply report back to the parent with what options are clicked
  // (emit closed, confirm, deny, etc)
  closePopup = output();

  popupTitle = input<string>();
  bodyTitle = input<string>();
  bodySubtitle = input<string>();
  icon = input<string>();

}
