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
    {name:"Buttons",link:"buttons", sample:'Primary Button\n<button class="button but-md primary pill pil-xs">Confirm</button>\nBasic Button Small\n<button class="button secondary but-sm pill pil-xs">Click</button>\nSmall Button\n<button class="button but-xs secondary pill pil-xs">Click</button>\nCirle Button\n<button class="button but-circle secondary">Click</button>'}, 
    {name:"Cards",link:"cards", sample:'<div class="card"><div>'},        
    {name:"Input",link:"input", sample:'<form (ngSubmit)="onSubmit()" [formValue]="formValue()" \n[suite]="suite" [validationConfig]="validationConfig" \n(validChange)="formValid.set($event || false)" (formValueChange)="setFormValue($event)"> \n\t<div class="form--horizontal-split"> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>First Name</span> \n\t\t\t\t<input type="text" [ngModel]="vm.firstName" name="firstName" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Last Name</span> \n\t\t\t\t<input type="text" [ngModel]="vm.lastName" name="lastName" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>EMail Address</span> \n\t\t\t\t<input type="text" [ngModel]="vm.email" name="email" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Password</span> \n\t\t\t\t<input type="text" [ngModel]="vm.password" name="password" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Confirm Password</span> \n\t\t\t\t<input type="text" [ngModel]="vm.confirmPassword" name="confirmPassword" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Age</span> \n\t\t\t\t<input type="text" [ngModel]="vm.age" name="age" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Emergency Contact</span> \n\t\t\t\t<input type="text" [ngModel]="vm.emergencyContact" name="emergencyContact" /> \n\t\t\t\t<small>(Emergency Contact only required for minors)</small> \n\t\t\t</label> \n\t\t</div> \n\t</div> \n</form>'},        
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

