import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SampleComponent } from '../sample/sample.component';
import { FormsModule } from '@angular/forms';
import { DocsComponent } from '../docs/docs.component';
import { NavComponent } from '../nav/nav.component';
import { SanitizeHtmlPipe } from '../sanitize-html-pipe/sanitize-html-pipe.component';
import { CardComponent } from '../card/card.component';
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule,SampleComponent,FormsModule, DocsComponent,NavComponent,SanitizeHtmlPipe, CardComponent, DrawerComponent],
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
    {name:"Drawers",link:"drawers", sample:'Drawer\n<app-drawer\nid="Drawer-Example1"\ndisplayName="Example Name"\n(toggled)="drawerToggled(\'Drawer-Example1\')"></app-drawer>'}
  ]

  public findSample(link:string): string{
    var result =  this.links.find(x => x.link == link)?.sample ?? ""
    return result;
  }

  public toggled()
  {
    console.warn("Toggled");
  }

}
