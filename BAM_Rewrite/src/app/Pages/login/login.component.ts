import { Component } from '@angular/core';
import { FooterComponent } from '../../Features/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent,FormsModule,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  /**
   *
   */
  constructor(private router:Router) {
   
  }

  public logon(){
    this.router.navigate(['home']);
  }
  public acceptedBanner = false;

}
