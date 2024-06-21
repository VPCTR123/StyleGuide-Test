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
{id: 3, title:'CORMIS Corrections Management Information System',description:'This is a complex database that acts as a very useful tool in the management of the administrative functions of Navy brigs and prisoners.  All Navy and US Marine Corps brigs, several US Air Force correctional facilities, and the US Army’s Disciplinary Barracks at Ft. Leavenworth, KS use CORMIS. CORMIS collects, tracks, and manages data on housing, level of custody, sex offender registration requirements, Brady Bill reporting requirements, jobs, appointments, mental and physical health histories, offenses, courts, sentences, transfers and releases. CORMIS performs as the central repository for the Victim and Witness Assistance Program data.  This program automatically calculates sentences, parole eligibility, manages service-members with non-judicial punishment, and Correctional  Custody Unit residents and  also maintains accountability of inmate funds and valuables and enhances the transfer of prisoners between brigs.',url:'https://www.bol.navy.mil/CORMIS',group:'',show:false,color:'#97a97c'},
{id: 4, title:'Admin Access',description:'Official Military Personnel File (OMPF) - Admin Access COMPFAT',url:'https://www.bol.navy.mil/OMPF_ADMIN',group:'Official Military Personnel File (OMPF)',show:false,color:'#97a97c'},
{id: 5, title:'Command View',description:'OMPFCV',url:'https://www.bol.navy.mil/OMPF_CV',group:'Official Military Personnel File (OMPF)',show:false,color:'#97a97c'},
{id: 6, title:'My Record',description:'OMPFV',url:'https://www.bol.navy.mil/OMPF',group:'Official Military Personnel File (OMPF)',show:false,color:'#97a97c'},
{id: 7, title:'SAAR',description:'SAAROMPF',url:'https://www.bol.navy.mil/OMPF_SAAR',group:'Official Military Personnel File (OMPF)',show:false,color:'#97a97c'},
{id:16, title:'Overseas Tour Extension Incentives Program (OTEIP)',description:'Overseas Tour Extension Incentives Program (OTEIP)',url:'https://www.bol.navy.mil/OTEIP',group:'',show:false,color:'#97a97c'},
{id:37, title:'Advancements/Selection Boards',description:'Officer and Enlisted Selection Boards and In-Service Procurement Lists',url:'https://www.bol.navy.mil/BOARDS',group:'',show:false,color:'#97a97c'},
{id:38, title:'Application (FORMAN) Status',description:'Application (FORMAN) Status',url:'https://www.bol.navy.mil/FORMAN',group:'',show:false,color:'#97a97c'},
{id:41, title:'CCA/FITREP/Eval Reports',description:'CCA/FITREP/Eval Reports',url:'https://www.bol.navy.mil/CCA',group:'Performance',show:false,color:'#97a97c'},
{id:43, title:'NavPers Legacy and PERSTEMPO',description:'NavPers Legacy and PERSTEMPO',url:'https://www.bol.navy.mil/NAVPERS',group:'',show:false,color:'#97a97c'},
{id:46, title:'Navy-Marine Corps Mobilization Processing System (NMCMPS) - View IA/ADSW orders',description:'Navy-Marine Corps Mobilization Processing System (NMCMPS) NMCMPS is a web-based tool for submitting, processing, and tracking Navy Contingency Augmentation requirements and the people temporarily assigned to these critical war time billets supporting the Global War on Terrorism.  It allows commands to update or monitor the status of all Active and Reserve Augmented Personnel reporting to their commands and provides information about the dates of arrival, enroute delays or exemptions, request for personnel extensions and transfers, and copies of mobilization orders are available online. Commanding Officers have default permission to access NMCMPS and may delegate authority to others to access, monitor, extract reports, or enter required data as appropriate.  Implementation assistance, self-training guides, user manuals, and information on the SIPRNET-based CLASSIFIED Requirement Tracking Module are available online at https:/www.npc.navy.mil/CommandSupport/NMCMPS. Unclassified modules of NMCMPS contains information that is For Official Use Only and must be safeguarded in accordance with SECNAVINST 5211.5D',url:'https://www.bol.navy.mil/NMCMPS',group:'',show:false,color:'#97a97c'},
{id:47, title:'ODC, OSR, PSR, ESR',description:'Professional Records (CCD Reports) - Provides Sailors with immediate access to professional records, including the Enlisted Summary Record, Officer Summary Record, Performance Summary Record, and Officer Data Card. Service members will be able to verify their professional information before an upcoming selection or promotion board.',url:'https://www.bol.navy.mil/CCDREPORTS',group:'',show:false,color:'#97a97c'},
{id:49, title:'Request Record on CD',description:'Request Record on CD',url:'https://www.bol.navy.mil/COMCD',group:'Official Military Personnel File (OMPF)',show:false,color:'#97a97c'},
{id:50, title:'Selective Reenlistment Bonus',description:'Selective Reenlistment Bonus',url:'https://www.bol.navy.mil/SRB',group:'',show:false,color:'#97a97c'},
{id:67, title:'Selection Board Member/Recorder Training',description:'Selection Board Member/Recorder Training',url:'https://mpte.navy.deps.mil/sites/Solutions/SBTraining/SitePages/Home.aspx',group:'Selection Board',show:false,color:'#97a97c'},
{id:77, title:'FAQs and workarounds for Off-line BOL Applications',description:'FAQs for workarounds',url:'http://www.public.navy.mil/bupers-npc/Documents/BPM_NPC_%20FAQ%205%20Aug%202014.docx',group:'',show:false,color:'#97a97c'},
{id:84, title:'FLAG FITREPS',description:'FLAG FITREPS',url:'https://www.bol.navy.mil/FPARS/dashboard.aspx',group:'Performance',show:false,color:'#97a97c'},
{id:87, title:'PRIMS',description:'PRIMS - NEW',url:'https://www.bol.navy.mil/PRIMS',group:'',show:false,color:'#97a97c'},
{id:90, title:'E-Submission',description:'ESUB',url:'https://www.bol.navy.mil/ESUB',group:'Official Military Personnel File (OMPF)',show:false,color:'#97a97c'},
{id:91, title:'Individual Medical Readiness (IMR) Status',description:'IMR',url:'https://www.bol.navy.mil/IMR',group:'',show:false,color:'#97a97c'},
{id:97, title:'FTS Redesignation',description:'FTS Redesignation',url:'https://www.bol.navy.mil/FTS',group:'',show:false,color:'#97a97c'},
{id:102, title:'Officer Promotion Calculator Model',description:'OPCM',url:'https://www.bol.navy.mil/OPCM',group:'',show:false,color:'#97a97c'},
{id:103, title:'ADMITS',description:'Alcohol and Drug Management Information Tracking System',url:'https://www.bol.navy.mil/ADMITS',group:'',show:false,color:'#97a97c'},
{id:106, title:'UCX',description:'UCX',url:'https://www.bol.navy.mil/UCX',group:'',show:false,color:'#97a97c'},
{id:111, title:'Configuration Management',description:'Configuration Management',url:'https://mpte.navy.deps.mil/sites/RCMS/SitePages/Home.aspx',group:'',show:false,color:'#97a97c'},
{id:112, title:'ODC, OSR, PSR, ESR',description:'Professional Records (CCD Reports) - Provides Sailors with immediate access to professional records, including the Enlisted Summary Record, Officer Summary Record, Performance Summary Record, and Officer Data Card. Service members will be able to verify their professional information before an upcoming selection or promotion board.',url:'https://www.bol.navy.mil/CCDREPORTS',group:'Performance',show:false,color:'#97a97c'},
{id:113, title:'PTDR',description:'PTDR',url:'https://www.bol.navy.mil/PTDR',group:'',show:false,color:'#97a97c'},
{id:114, title:'CO/XO/CMC Advancement/Selection Board Verification',description:'CO/XO/CMC Advancement/Selection Board Verification',url:'https://www.bol.navy.mil/boards/UICAccessList.aspx',group:'Selection Board',show:false,color:'#97a97c'},
{id:115, title:'Naval Register',description:'Naval Register',url:'https://www.bol.navy.mil/NAVREG',group:'',show:false,color:'#97a97c'},
{id:116, title:'Overseas / Remote / GSA',description:'Overseas Screening',url:'https://www.bol.navy.mil/OVERSEAS',group:'',show:false,color:'#97a97c'},
{id:117, title:'Military Locator System',description:'MLS Points of contact-Navy Personnel Command DSN: 882-2187 or (901)874-2125 Email: MLS_SAARS.FCT@navy.mil',url:'https://www.bol.navy.mil/MLS',group:'',show:false,color:'#97a97c'},
{id:118, title:'ARPR/ASOSH Online',description:'The ARPR and ASOSH are available to you online in a secure environment,  24 hours a day,  seven days a week. Retirement points electronically submitted reflect online approximately 60 days from date of transmission and the anniversary month updates/closes two months after the month passes and will reflect online the first Monday of the third month.',url:'https://www.bol.navy.mil/ARPR',group:'',show:false,color:'#97a97c'},
{id:121, title:'FMDS',description:'Flag Matters',url:'https://www.bol.navy.mil/FMDS',group:'',show:false,color:'#97a97c'},
{id:122, title:'Transfer of Education Benefits Rejection/Approval Notification (TEB-RAN)',description:'Transfer of Education Benefits',url:'https://www.bol.navy.mil/TEBRN/Home.aspx',group:'',show:false,color:'#97a97c'},
{id:124, title:'Navy Personnel Command Document Services',description:'Navy Personnel Command Document Services',url:'https://nefp.bol.navy.mil/lc/ws',group:'',show:false,color:'#97a97c'},
{id:125, title:'NavPers - My PERSTEMPO',description:'NavPers - My PERSTEMPO',url:'https://www.bol.navy.mil/PTDMRS/PTForecast.aspx?ReturnTo=MNP',group:'',show:false,color:'#97a97c'},
{id:150, title:'Career Waypoints',description:'Career Waypoints (C-WAY) is a human resource information system that matches   distributable, best performing Sailors to the Navy’s manpower requirements. It serves as a   service continuum system and is designed as a long-term force management tool. It balances   manning across rates, ratings, Active Component (AC), Full Time Support (FTS), and Reserve   Component (RC) through Bureau of naval Personnel (BUPERS) control of the reenlistment and   enlistment contract extension quotas.',url:'https://www.bol.navy.mil/cwayweb/appentry.aspx',group:'Career Waypoints',show:false,color:'#97a97c'},
{id:151, title:'JOIN',description:'Job Opportunities In the Navy.',url:'https://www.bol.navy.mil/JOIN/',group:'Career Waypoints',show:false,color:'#97a97c'},
{id:152, title:'JOIN Admin',description:'Job Opportunities In the Navy(Administration)',url:'https://www.bol.navy.mil/JOINAdmin/',group:'Career Waypoints',show:false,color:'#97a97c'},
{id:154, title:'JOIN DNA Review',description:'The JOIN DNA Review web application is a tool that allows the SME user to record personal information such as their paygrade, time worked in that rating and contact information, and to rank work activities and select work styles for a specific rating.',url:'https://www.bol.navy.mil/cway_joindnareview',group:'Career Waypoints',show:false,color:'#97a97c'},
{id:250, title:'ID Lookup',description:'ID Lookup',url:'https://www.bol.navy.mil/idlookup/',group:'',show:false,color:'#97a97c'},
{id:253, title:'CWAY - Sailor Self-Service',description:'CWAY - Sailor Self-Service',url:'https://www.bol.navy.mil/cwaysailorselfservice/Landing/LandingPage.aspx',group:'Career Waypoints',show:false,color:'#97a97c'},
{id:275, title:'ESSBD (Submit letter to SelBoard)',description:'Electronic Submssion to Selection Board',url:'https://nefp.bol.navy.mil/lc/apps/ws/index.html#/startprocess/ESSBD2%2FESSBD%20Letter%20to%20Board',group:'Selection Board',show:false,color:'#97a97c'},
{id:280, title:'Officer Photo',description:'NAVPERS 1070/884',url:'https://nefp.bol.navy.mil/lc/apps/ws/index.html#/startprocess/NAVPERS%201070-884%2FNAVPERS%201070-884',group:'Document Services',show:false,color:'#97a97c'},
{id:285, title:'Name Change',description:'NAVPERS 1070/888',url:'https://nefp.bol.navy.mil/lc/apps/ws/index.html#/startprocess/eForms%2FNAVPERS%201070-888',group:'Document Services',show:false,color:'#97a97c'},
{id:305, title:'BOL Helpdesk',description:'BOL Helpdesk',url:'https://www.bol.navy.mil/helpdesk',group:'',show:false,color:'#97a97c'},
{id:310, title:'PARFQ',description:'PRIMS v4 PARFQ link for My Navy Portal',url:'https://www.bol.navy.mil/PRIMS/PARFQ',group:'',show:false,color:'#97a97c'},
{id:311, title:'SCORE',description:'The Selection & Classification of Recruits Evaluator (SCORE) web application is a tool that makes the Rating Identification Engine (RIDE) parameters and analyses accessible to Navy Selection & Classification (S&C) administrative analysts. The application allows users to view and modify RIDE and related parameters, view analysis results, and run what-if simulations for different parameter settings.',url:'https://www.bol.navy.mil/scoreweb',group:'',show:false,color:'#97a97c'},
{id:320, title:'ERC',description:'Emprs Record Client (ERC)',url:'https://www.bol.navy.mil/ERC/',group:'Official Military Personnel File (OMPF)',show:false,color:'#97a97c'},
{id:330, title:'eNavFit Program',description:'eNavFit',url:'https://nefp.bol.navy.mil/lc/ws',group:'Performance',show:false,color:'#97a97c'},
{id:340, title:'NDAWS',description:'Navy Department of Awards Web Service',url:'https://nefp.bol.navy.mil/lc/ws',group:'Document Services',show:false,color:'#97a97c'}];


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
    console.warn('clicked');
    app.show = true;
  }

 

}
