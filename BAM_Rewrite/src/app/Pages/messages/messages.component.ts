import { Component } from '@angular/core';
import { HeaderComponent } from '../../Features/header/header.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

}
