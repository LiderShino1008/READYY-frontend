import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { AdminComponent } from './components/user/admin/admin.component';
import { AdminCompaniesComponent } from './components/user/admin-companies/admin-companies.component';
import { BuyerComponent } from './components/user/buyer/buyer.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'companies', component: CompaniesComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'admin-companies', component: AdminCompaniesComponent},
  { path: 'buyer', component: BuyerComponent},
  /* sitio web particular, construccion de sitios, admin de plantillas */
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
