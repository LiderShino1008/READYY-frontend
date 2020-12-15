import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { FormBusinessAdminComponent } from './components/signup/form-business-admin/form-business-admin.component';
import { FormBuyerComponent } from './components/signup/form-buyer/form-buyer.component';
import { FooterComponent } from './components/footer/footer.component';
import { BuyerComponent } from './components/user/buyer/buyer.component';
import { AdminComponent } from './components/user/admin/admin.component';
import { AdminCompaniesComponent } from './components/user/admin-companies/admin-companies.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    CompaniesComponent,
    FormBusinessAdminComponent,
    FormBuyerComponent,
    FooterComponent,
    AdminComponent,
    AdminCompaniesComponent,
    BuyerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
