import { CommonModule } from '@angular/common';
import { Component, input, signal, ViewEncapsulation } from '@angular/core';
import { SampleComponent } from '../sample/sample.component';
import { FormsModule } from '@angular/forms';
import { DocsComponent } from '../docs/docs.component';
import { NavComponent } from '../nav/nav.component';
import { SanitizeHtmlPipe } from '../sanitize-html-pipe/sanitize-html-pipe.component';
import { CardComponent } from '../card/card.component';
import { DrawerComponent } from '../drawer/drawer.component';
import { Address } from '../../models/address';
import { templateDrivenForms } from '../../template-driven-forms/template-driven.forms';
import { FormsComponent } from '../forms/forms.component';



@Component({
    selector: 'app-guide',
    standalone: true,
    templateUrl: './guide.component.html',
    styleUrl: './guide.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [ CommonModule, SampleComponent, FormsModule, DocsComponent, NavComponent, SanitizeHtmlPipe, CardComponent, DrawerComponent, templateDrivenForms,FormsComponent],
    viewProviders: [templateDrivenForms]

})
export class GuideComponent {
  protected readonly formValid = signal<boolean>(false);
  vm= input<Address>()
  

  /** Name for the formGroup when added to the parent form. Defaults to 'address'. */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  ngModelGroupName = input<string>('address');
  public selected:string ="";
  public links = [
    {name:"Navigation",link:"navigation"},
    {name:"Buttons",link:"buttons", sample:'Button\n<button class="button">Click</button>\nButton Small\n<button class="button but-sm">Click</button>\nButton Circle\n<button class="button but-circle">Click</button>\nButton Secondary\n<button class="button but-secondary">Click</button>'}, 
    {name:"Cards",link:"cards", sample:'<div class="card"><div>'},        
    {name:"Input",link:"input", sample:'<div class="input"><div>'},        
    {name:"Second",link:"second"}, 
    {name:"Drawers",link:"drawers", sample:'Drawer\n<app-drawer (toggled)="toggleTrigger($event)" displayName="Drawer Name">\n\t<div class="padding pad-smHr">\n\t\t<p>Put</p>\n\t\t<p>Content</p>\n\t\t<p>Here</p>\n\t</div>\n</app-drawer>'},
    {name:"Icons",link:"icons", sample:'<p class="icon ico-md ico-carret-u"></p>'}
  ]

  public findSample(link:string): string{
    var result =  this.links.find(x => x.link == link)?.sample ?? ""
    return result;
  }


  // Example function for consuming the Drawer toggle emitter
  public toggled($event:any)
  {
    let toggleEvent = {
      state: $event.state,
      name: $event.displayName
    }

    console.warn(toggleEvent.name + " Toggled to: " + toggleEvent.state);
  }

}

