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
import { PopupComponent } from '../popup/popup.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuItemComponent } from '../menu/menu-item/menu-item.component';
import { DropdownComponent, DropdownOption } from '../dropdown/dropdown.component';



@Component({
    selector: 'app-guide',
    standalone: true,
    templateUrl: './guide.component.html',
    styleUrl: './guide.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [ CommonModule, SampleComponent, FormsModule, DocsComponent, NavComponent, SanitizeHtmlPipe, CardComponent, DrawerComponent, templateDrivenForms,FormsComponent,PopupComponent, MenuComponent,MenuItemComponent,DropdownComponent],
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
    {name:"Drawers",link:"drawers", sample:'Drawer\n<app-drawer (toggled)="toggleTrigger($event)" displayName="Drawer Name">\n\t<div class="padding pad-smHr">\n\t\t<p>Put</p>\n\t\t<p>Content</p>\n\t\t<p>Here</p>\n\t</div>\n</app-drawer>',  script:'public toggled($event:any)\n{\n  let toggleEvent = {\n    state: $event.state,\n    name: $event.displayName\n  }\n\n  console.warn(toggleEvent.name + " Toggled to: " + toggleEvent.state);\n}'},
    {name:"Icons",link:"icons", sample:'<p class="icon ico-md ico-carret-u"></p>'},
    {name: "Grids",link:"grids", sample:'<h3>Small/Thin Grid (Its reactive)</h3>\n<div class="grid gri-sm">\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    <p>--Paragraphs--</p>\n    <button class="button but-md primary pill pil-xs margin mar-xsT mar-smHr">Confirm</button>\n    <button class="button secondary but-sm pill pil-xs margin mar-xsT mar-smHr">Deny</button>\n  </div>\n  <div class="card car-lgVr padding pad-smHr margin mar-sm">\n    <div class="grid gri-xs">\n      <app-card class="margin mar-xsVr" title="Lorem"></app-card>\n      <app-card class="margin mar-xsVr" title="Ipsum"></app-card>\n      <app-card class="margin mar-xsVr" title="Dolor"></app-card>\n      <app-card class="margin mar-xsVr" title="Sit"></app-card>\n      <app-card class="margin mar-xsVr" title="Amet"></app-card>\n    </div>\n  </div>\n  <div class="card car-smVr car-lgHr padding pad-md margin mar-sm">--Paragraphs--</div>\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    <app-drawer (toggled)="toggled($event)" displayName="Question?"\n      drawer_handle="padding pad-smVr pad-smHr gap gap-sm" drawer="" icon="ico-sm ico-carret-d">\n      <div class="padding pad-smVr pad-smHr">\n        <span class="flex fle-centerHr">This very well could be your answer.</span>\n      </div>\n    </app-drawer>\n    <app-drawer (toggled)="toggled($event)" displayName="Tips&Tricks"\n      drawer_handle="padding pad-smVr pad-smHr gap gap-sm" drawer="" icon="ico-sm ico-carret-d">\n      <div class="padding pad-smVr pad-smHr">\n        <span class="flex fle-centerHr">Check the console! I announce when I open and close.</span>\n      </div>\n    </app-drawer>\n    <app-drawer (toggled)="toggled($event)" displayName="Last Example"\n      drawer_handle="padding pad-smVr pad-smHr gap gap-sm" drawer="" icon="ico-sm ico-carret-d">\n      <div class="padding pad-smVr pad-smHr">\n        <span class="flex fle-centerHr">Just trying to fill the space.</span>\n      </div>\n    </app-drawer>\n  </div>\n</div>\n\n<h3 class="margin mar-mdT">Fixed Half Grid</h3>\n<div class="grid gri-halves">\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    (Literally anything can go here!)\n  </div>\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    (Literally anything can go here!)\n  </div>\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    (Literally anything can go here!)\n  </div>\n  <div class="card car-mdVr padding pad-md margin mar-sm">\n    (Literally anything can go here!)\n  </div>\n</div>'},
    {name:"Pop-Ups",link:"popups", sample:'<app-popup *ngIf="showExampleDialog" (closePopup)="cancelClicked()">\n \t<div class="title">\n \t\tApp Details\n \t</div>\n \t<div class="body-icon-header">\n \t\t<span class="icon ico-md ico-th ico-color"></span>\n \t</div>\n \t<div class="body-header">\n \t\tHeader\n \t</div>\n \t<div class="body-sub-header">\n \t\tSubHeader\n \t</div>\n \t<div class="body">\n \t\tLorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio sint quis repellendus nam\n \t\tipsam autem aspernatur quaerat, est delectus. Id consequuntur, fugit similique quibusdam dicta\n \t\tdolorum velit corporis alias quae! Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n \t\tNecessitatibus tempore exercitationem ex distinctio esse dolor corporis numquam nesciunt\n \t\tconsectetur! Ullam unde distinctio repellat ab quos. Earum error porro laboriosam iste? </div>\n \t<div class="foot padding pad-sm flex fle-end gap gap-sm">\n \t\t<button class="but-square secondary pill pil-xs" (click)="cancelClicked()">A</button>\n \t\t<button class="but-square secondary pill pil-xs" (click)="cancelClicked()">B</button>\n \t\t<button class=" but-md primary padding pad-mdHr pill pil-xs" (click)="confirmClicked()">\n \t\t\tLaunch App\n \t\t</button>\n \t</div>\n </app-popup>\n \n <app-popup *ngIf="showConfirmDialog"\n (closePopup)="cancelClicked()">\n \t<div class="title">\n \t\tConfirmation\n \t</div>\n \t<div class="body">\n \t\tAre you sure about that?\n \t</div>\n \t<div class="foot padding pad-sm flex fle-centerHr gap gap-sm">\n \t\t<button class="but-md secondary pill pil-xs" (click)="cancelClicked()">\n \t\t\tNo\n \t\t</button>\n \t\t<button class=" but-md primary padding pad-mdHr pill pil-xs" (click)="confirmClicked()">\n \t\t\tYes\n \t\t</button>\n \t</div>\n </app-popup>\n', script: 'showExampleDialog:boolean = false;\nshowConfirmDialog:boolean = false;\n\npublic confirmClicked()\n{\n  //Do the thing, close the dialog\n  this.showExampleDialog = false;\n  this.showConfirmDialog  = false;\n}\n\npublic cancelClicked()\n{\n  this.showExampleDialog = false;\n  this.showConfirmDialog  = false;\n}'},
    {name:"Menus",link:"menus", sample:'<app-menu username="John Doe">\n\t\t<app-menu-item menuItemName="Messages" (menuItemClicked)="MenuItemTest(\'messages\')"></app-menu-item>\n\t\t<app-menu-item menuItemName="Update Info" (menuItemClicked)="MenuItemTest(\'update info\')"></app-menu-item>\n\t\t<app-menu-item menuItemName="Log Out" (menuItemClicked)="MenuItemTest(\'log out\')"></app-menu-item>\n</app-menu>', script:'public MenuItemTest(s:string) \n{ \n\t\t// Do stuff with a function when you consume the emitted output \n\t\tconsole.log(s+" clicked") \n}'}, 
    {name: "Dropdowns",link:"dropdowns",sample:'',script:''}
  ]

  public dropdownOptions: DropdownOption[] = [
    {name:'option1', value: 1},
    {name:'option2', value: 2},
    {name:'option3', value: 3},
    {name:'option4', value: 4},
    {name:'option5', value: 5},
  ]


  showExampleDialog:boolean = false;
  showConfirmDialog:boolean = false;

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

  public confirmClicked()
  {
    //Do the thing, close the dialog
    this.showExampleDialog = false;
    this.showConfirmDialog  = false;
  }

  public cancelClicked()
  {
    this.showExampleDialog = false;
    this.showConfirmDialog  = false;
  }

  public MenuItemTest(s:string)
  {
    // Do stuff with a function when you consume the emitted output
    console.log(s+" clicked")
  }

  public consumeDropdownEmission(event:DropdownOption)
  {
    console.log(event);
  }
}

