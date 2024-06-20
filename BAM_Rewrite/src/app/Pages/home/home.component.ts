import { Component } from '@angular/core';
import { FooterComponent } from '../../Features/footer/footer.component';
import { HeaderComponent } from '../../Features/header/header.component';
import { DrawerComponent } from '../../Features/drawer/drawer.component';
import { CardComponent } from '../../Features/card/card.component';
import { CommonModule } from '@angular/common';
import { Application } from '../../Models/ApplicationModel';
import { PopupComponent } from '../../Features/popup/popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PopupComponent, FooterComponent,HeaderComponent,DrawerComponent,CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {

 

  public apps:Application[] = [
    {title:'test',description:'desc',show:false,color:'#97a97c'},
    {title:'test1',description:'desc1',show:false,color:'#718355'},
    {title:'test2',description:'desc2',show:false,color:'#a4b092'},
    {title:'test3',description:'desc3',show:false,color:'#014f86'}
  ];

  public test(app:Application){
    console.warn("clicked");
    app.show = true;
  }

 

}
