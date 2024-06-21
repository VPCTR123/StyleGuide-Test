import { Component,Input,OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PopupComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  /**
   *
   */
  constructor(public router:Router) {
    
    
  }

  public showUserMenu = false;
  public showOptionsMenu = false;
  @Input() navigated = false;

  public ngOnInit(){
    document.documentElement.style.setProperty('--userColor', '#718355');
  }

}
