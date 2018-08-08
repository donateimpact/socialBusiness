import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { DonateComponent } from './donate/donate.component';
import { CreateProjectComponent } from './createproject/createproject.component';
import { DetailsComponent } from './details/details.component';
import { MetamaskComponent } from './metamask/metamask.component';
import { ImpressumComponent } from './impressum/impressum.component';


const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'donate',           component: DonateComponent },
    { path: 'create',           component: CreateProjectComponent },
    { path: 'details',          component: DetailsComponent },
    { path: 'metamask',         component: MetamaskComponent },
    { path: 'impressum',        component: ImpressumComponent},
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
