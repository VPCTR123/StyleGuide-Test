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
    {name:"Buttons",link:"buttons", sample:'Primary Button\n<button class="button but-md primary pill pil-xs">Confirm</button>\nBasic Button Small\n<button class="button secondary but-sm pill pil-xs">Click</button>\nSmall Button\n<button class="button but-xs secondary pill pil-xs">Click</button>\nCirle Button\n<button class="button but-circle secondary">Click</button>', script: 'public findScript(link:string): string{\n    return "";\n}'}, 
    {name:"Cards",link:"cards", sample:'<div class="card"><div>'},        
    {name:"Input",link:"input", sample:'<form (ngSubmit)="onSubmit()" [formValue]="formValue()" \n[suite]="suite" [validationConfig]="validationConfig" \n(validChange)="formValid.set($event || false)" (formValueChange)="setFormValue($event)"> \n\t<div class="form--horizontal-split"> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>First Name</span> \n\t\t\t\t<input type="text" [ngModel]="vm.firstName" name="firstName" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Last Name</span> \n\t\t\t\t<input type="text" [ngModel]="vm.lastName" name="lastName" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>EMail Address</span> \n\t\t\t\t<input type="text" [ngModel]="vm.email" name="email" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Password</span> \n\t\t\t\t<input type="text" [ngModel]="vm.password" name="password" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Confirm Password</span> \n\t\t\t\t<input type="text" [ngModel]="vm.confirmPassword" name="confirmPassword" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Age</span> \n\t\t\t\t<input type="text" [ngModel]="vm.age" name="age" /> \n\t\t\t</label> \n\t\t</div> \n\t\t<div scControlWrapper> \n\t\t\t<label class="margin mar-smT"> \n\t\t\t\t<span>Emergency Contact</span> \n\t\t\t\t<input type="text" [ngModel]="vm.emergencyContact" name="emergencyContact" /> \n\t\t\t\t<small>(Emergency Contact only required for minors)</small> \n\t\t\t</label> \n\t\t</div> \n\t</div> \n</form>'},        
    {name:"Second",link:"second"}, 
    {name:"Drawers",link:"drawers", sample:'Drawer\n<app-drawer (toggled)="toggleTrigger($event)" displayName="Drawer Name">\n\t<div class="padding pad-smHr">\n\t\t<p>Put</p>\n\t\t<p>Content</p>\n\t\t<p>Here</p>\n\t</div>\n</app-drawer>'},
    {name:"Icons",link:"icons", sample:'<p class="icon ico-md ico-carret-u"></p>'},
    {name: "Grids",link:"grids", sample:'<h3>Small/Thin Grid (Its reactive)</h3>\n<div class="grid gri-sm">\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    <p>--Paragraphs--</p>\n    <button class="button but-md primary pill pil-xs margin mar-xsT mar-smHr">Confirm</button>\n    <button class="button secondary but-sm pill pil-xs margin mar-xsT mar-smHr">Deny</button>\n  </div>\n  <div class="card car-lgVr padding pad-smHr margin mar-sm">\n    <div class="grid gri-xs">\n      <app-card class="margin mar-xsVr" title="Lorem"></app-card>\n      <app-card class="margin mar-xsVr" title="Ipsum"></app-card>\n      <app-card class="margin mar-xsVr" title="Dolor"></app-card>\n      <app-card class="margin mar-xsVr" title="Sit"></app-card>\n      <app-card class="margin mar-xsVr" title="Amet"></app-card>\n    </div>\n  </div>\n  <div class="card car-smVr car-lgHr padding pad-md margin mar-sm">--Paragraphs--</div>\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    <app-drawer (toggled)="toggled($event)" displayName="Question?"\n      drawer_handle="padding pad-smVr pad-smHr gap gap-sm" drawer="" icon="ico-sm ico-carret-d">\n      <div class="padding pad-smVr pad-smHr">\n        <span class="flex fle-centerHr">This very well could be your answer.</span>\n      </div>\n    </app-drawer>\n    <app-drawer (toggled)="toggled($event)" displayName="Tips&Tricks"\n      drawer_handle="padding pad-smVr pad-smHr gap gap-sm" drawer="" icon="ico-sm ico-carret-d">\n      <div class="padding pad-smVr pad-smHr">\n        <span class="flex fle-centerHr">Check the console! I announce when I open and close.</span>\n      </div>\n    </app-drawer>\n    <app-drawer (toggled)="toggled($event)" displayName="Last Example"\n      drawer_handle="padding pad-smVr pad-smHr gap gap-sm" drawer="" icon="ico-sm ico-carret-d">\n      <div class="padding pad-smVr pad-smHr">\n        <span class="flex fle-centerHr">Just trying to fill the space.</span>\n      </div>\n    </app-drawer>\n  </div>\n</div>\n\n<h3 class="margin mar-mdT">Fixed Half Grid</h3>\n<div class="grid gri-halves">\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    (Literally anything can go here!)\n  </div>\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    (Literally anything can go here!)\n  </div>\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    (Literally anything can go here!)\n  </div>\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    (Literally anything can go here!)\n  </div>\n</div>'}
  ]

  public findSample(link:string): string{
    var result =  this.links.find(x => x.link == link)?.sample ?? ""
    return result;
  }

  public findScript(link:string): string{
    var result =  this.links.find(x => x.link == link)?.script ?? ""
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

  public cardClicked($event:any)
  {

  }

}

