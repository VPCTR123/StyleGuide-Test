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
    {group:'',title:'test',description:'desc',show:false,color:'#97a97c'},
    {group:'',title:'test1',description:'desc1',show:false,color:'#718355'},
    {group:'',title:'test2',description:'desc2',show:false,color:'#a4b092'},
    {group:'',title:'test3',description:'desc3',show:false,color:'#014f86'},
    {group:'A',title:'test',description:'desc',show:false,color:'#97a97c'},
    {group:'A',title:'test1',description:'desc1',show:false,color:'#718355'},
    {group:'B',title:'test2',description:'desc2',show:false,color:'#a4b092'},
    {group:'B',title:'test3',description:'desc3',show:false,color:'#014f86'},
    {group:'c',title:'test2',description:'desc2',show:false,color:'#a4b092'},
    {group:'d',title:'test3',description:'desc3',show:false,color:'#014f86'}
  ];

  public groups:{ group: string; apps: Application[] }[] = this.groupByGroupName(this.apps);

  public groupByGroupName(apps: Application[]): { group: string; apps: Application[] }[] {
    const groupedApps: Record<string, Application[]> = {};

    for (const app of apps) {
        if (!groupedApps[app.group]) {
            groupedApps[app.group] = [];
        }
        groupedApps[app.group].push(app);
    }

    // Convert the groupedApps object into an array of records
    const result: { group: string; apps: Application[] }[] = [];
    for (const group in groupedApps) {
        result.push({ group, apps: groupedApps[group] });
    }

    return result;
}

  public test(app:Application){
    console.warn("clicked");
    app.show = true;
  }

 

}
