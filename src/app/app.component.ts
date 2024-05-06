import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuideComponent } from './features/guide/guide.component';
import { CardComponent } from './features/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GuideComponent,CardComponent, CommonModule],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'Style Guide';
  public content = 'Custom Components Go Here...'

  public emission = false;

  public toggleEmission()
  {
    this.emission = !this.emission;
  }
}
