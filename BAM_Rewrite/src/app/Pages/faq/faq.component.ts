import { Component } from '@angular/core';
import { DrawerComponent } from '../../Features/drawer/drawer.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Features/header/header.component';
import { FooterComponent } from '../../Features/footer/footer.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [DrawerComponent,CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FAQComponent {

  public questions: Question[] = [
{question:'What is BUPERS Online?', answer:'BUPERS Online is a single point of entry site for logging into numerous web-based applications maintained by the Naval Personnel Command in Millington, TN.'},
{question:'Does this site use cookies, and if so, why?', answer:'NOT AT THIS TIME.'},
{question:'Why did I have to accept a DOD PKI certificate?', answer:'ACCESS TO BOL REQUIRES UPDATED DOD CERTIFICATES FOR AUTHENTICATION.'},
{question:'Who do I contact for IT related support?', answer:'Please contact the Bupers07_it_eoc.fct@navy.mil or 901-874-4700/DSN 874-4700 The EOC Service Desk is available 24/7/365.'},
{question:'How do Civilian, Contactor, or non-Navy military personnel gain access to BUPERS Online?', answer:'Please contact the NPC IT Service Desk at BUPERS07_IT_EOC.FCT@navy.mil or 901-874-4700/DSN 882-4700. A valid SAAR DD2875, in accordance with NAVADMIN 259/23 and valid Navy User Agreement. All civilian, contractor and other non-Navy personnel accounts have an expiration date on them. As long as there is activity in the account on a regular basis, the expiration date will continue to re-tabulate. If an account has no activity during a 90-day cycle, it will become inactive. At that time, a new SAAR-N will have to be submitted to have the account reactivated. DD2875 can be found here,: https://www.esd.whs.mil/Portals/54/Documents/DD/forms/dd/dd2875.pdf'},
{question:'How can I gain access to Advancements and Promotions listings?', answer:'The BUPERS07 IT Service Desk cannot grant BUPERS Web Access. To gain or remove access to the following applications on BUPERS Online: Advancements/Selection Boards, Application (Forman) Status, Selective Reenlistment Bonus, and Overseas/Remote/GSA; please complete request on Command Letterhead and submit to mill_pers-4helpdesk@navy.mil without any part of the members SSN. **NOTE: Please specify Overseas/Remote/GSA if this access is required.** If you have any questions please call Pers 455E helpdesk at 901-874-3249/DSN 882-3249.'},
{question:'How can I gain access to CORMIS?', answer:'Your command should be able to help with your CORMIS access or you can also contact the CORMIS helpdesk for issues or requests related to the application at cormis_help_desk1@navy.mil or (901) 874-4907.'},
{question:'I am a retired Navy member and need access to my records. How can I access my records?', answer:'You can request portions of your record through Milconnect. https://milconnect.dmdc.osd.mil/milconnect/ . Sign in >ok >retrieve my correspondence >correspondence/documentation >Defense Personnel records Information (DPRIS) >Request Personnel File. From there, select the documents that you want uploaded. You will be notified by email when your records are available.'},
  ];

}

class Question{
  public question:string ="";
  public answer:string ="";
}
