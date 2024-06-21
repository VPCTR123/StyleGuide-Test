import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { FAQComponent } from './Pages/faq/faq.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent},
    { path: 'faq', component: FAQComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
