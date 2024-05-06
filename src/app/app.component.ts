import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuideComponent } from './features/guide/guide.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GuideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Style Guide';
  content = 'Custom Components Go Here...'
}
