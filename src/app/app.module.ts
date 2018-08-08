import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';

import { DonateModule } from './donate/donate.module';
import { CreateProjectModule } from './createproject/createproject.module';
import { DetailsModule } from './details/details.module';

import { ContractFunctionsService } from './services/contract-functions.service';
import { Web3ConnectorService } from './services/web3-connector.service';
import { MetamaskModule } from './metamask/metamask.module';
import { ImpressumComponent } from './impressum/impressum.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    ImpressumComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    MetamaskModule,
    CreateProjectModule,
    DetailsModule,
    DonateModule,
  ],
  providers: [
    Web3ConnectorService,
    ContractFunctionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
