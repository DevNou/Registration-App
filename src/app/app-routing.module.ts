import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'list', component: RegistrationListComponent },



  { path: 'register', component: CreateRegistrationComponent },

  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'update/:id', component: CreateRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
