import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../Features/footer/footer.component';
import { HeaderComponent } from '../../Features/header/header.component';
import { DrawerComponent } from '../../Features/drawer/drawer.component';
import { CardComponent } from '../../Features/card/card.component';
import { CommonModule } from '@angular/common';
import { Application } from '../../Models/ApplicationModel';
import { PopupComponent } from '../../Features/popup/popup.component';
import { MockDataService } from '../../Services/MockDataService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PopupComponent, FooterComponent, HeaderComponent, DrawerComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {



  public apps: Application[] = [];


  public groups: { group: string; apps: Application[] }[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.mockDataService.getApps().subscribe((applist) => {
      this.apps = applist;
      this.groups = this.groupByGroupName(this.apps);
    });
  }

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

  public test(app: Application) {
    console.warn('clicked');
    app.show = true;
  }



}
