import { Component } from '@angular/core';
import { HeaderComponent } from '../../Features/header/header.component';
import { FooterComponent } from '../../Features/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
