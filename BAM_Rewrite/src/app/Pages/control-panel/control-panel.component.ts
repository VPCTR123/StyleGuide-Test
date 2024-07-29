import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../../Features/header/header.component';
import { Application } from '../../Models/ApplicationModel';
import { MockDataService } from '../../Services/MockDataService';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [HeaderComponent, NgFor, FormsModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent implements OnInit {
  public appsList: Application[] = [];
  constructor(private mockDataService: MockDataService) {}

  public appNames: any[] = [];
  public selectedApp:string = "";

  ngOnInit() {
    this.mockDataService.getApps().subscribe((apps) => {
      this.appsList = apps;
      this.appNames = [];
      this.appsList.forEach(app => {
        this.appNames.push(app.title)
      });
    });
  }

  appSelected()
  {
    console.log(this.selectedApp);
  }

  public buttonclick()
  {
    let changedApp = this.appsList.find(app => app.title == this.selectedApp);
    if(changedApp)
    {
      changedApp.title = changedApp?.title+"-CHANGED";
      //console.log(changedApp);
      this.mockDataService.putApp(changedApp);
    }
  }

}
