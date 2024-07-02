import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Features/header/header.component';
import { FooterComponent } from './Features/footer/footer.component';
import { ControlPanelComponent } from './Pages/control-panel/control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HomeComponent, LoginComponent,HeaderComponent,FooterComponent, ControlPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bam_Rewrite';
}
