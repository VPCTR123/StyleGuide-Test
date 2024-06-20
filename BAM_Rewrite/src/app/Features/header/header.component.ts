import { Component,OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PopupComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public showUserMenu = false;
  public showOptionsMenu = false;

  public ngOnInit(){
    document.documentElement.style.setProperty('--userColor', '#718355');
  }

}
