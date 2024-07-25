import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Features/header/header.component';
import { Application } from '../../Models/ApplicationModel';
import { MockDataService } from '../../Services/MockDataService';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent implements OnInit {
  public appsList: any[] = [];
  constructor(private mockDataService: MockDataService) {}


  ngOnInit() {
    this.mockDataService.getApps().subscribe((apps) => {
      this.appsList = apps;
    })
  }

}
