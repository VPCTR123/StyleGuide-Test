import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SampleComponent } from '../sample/sample.component';
import { FormsModule } from '@angular/forms';
import { DocsComponent } from '../docs/docs.component';
import { NavComponent } from '../nav/nav.component';
import { SanitizeHtmlPipe } from '../sanitize-html-pipe/sanitize-html-pipe.component';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule,SampleComponent,FormsModule, DocsComponent,NavComponent,SanitizeHtmlPipe],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss'
})
export class GuideComponent {
  public selected:string ="";
  public links = [
    {name:"Navigation",link:"navigation"},
    {name:"Buttons",link:"buttons", sample:'Button\n<button class="button">Click</button>\nButton Small\n<button class="button but-sm">Click</button>\nButton Circle\n<button class="button but-circle">Click</button>\nButton Secondary\n<button class="button but-secondary">Click</button>'}, 
    {name:"Cards",link:"cards", sample:'<div class="card"><div>'},        
    {name:"Second",link:"second"}, 
  ]

  public findSample(link:string): string{
    var result =  this.links.find(x => x.link == link)?.sample ?? ""
    return result;
  }

}
